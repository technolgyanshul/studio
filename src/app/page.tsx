"use client";

import * as React from "react";
import type { Tab, Session } from "@/lib/types";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { generateCodeComment } from "@/ai/flows/generate-code-comment";
import { useId } from "react";

import { MainHeader } from "@/components/app/main-header";
import { TabManagement } from "@/components/app/tab-management";
import { SessionManagement } from "@/components/app/session-management";
import { CommentGenerator } from "@/components/app/comment-generator";
import { useToast } from "@/hooks/use-toast";
import { MOCK_TABS } from '@/lib/mock-data';


export default function TabIntegratorPage() {
  const { toast } = useToast();
  const [tabs, setTabs] = React.useState<Tab[]>([]);
  const [selectedTabs, setSelectedTabs] = React.useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = React.useState("");

  const [sessions, setSessions] = useLocalStorage<Session[]>("tab-sessions", []);
  const [sessionName, setSessionName] = React.useState("");

  const [generatedComment, setGeneratedComment] = React.useState("");
  const [isGenerating, setIsGenerating] = React.useState(false);
  const componentId = useId();

  const filteredTabs = React.useMemo(() => {
    return tabs.filter(
      (tab) =>
        tab.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tab.url.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [tabs, searchQuery]);

  const handleTabSelect = (tabId: string) => {
    setSelectedTabs((prev) => {
      const newSelection = new Set(prev);
      if (newSelection.has(tabId)) {
        newSelection.delete(tabId);
      } else {
        newSelection.add(tabId);
      }
      return newSelection;
    });
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedTabs(new Set(filteredTabs.map((tab) => tab.id)));
    } else {
      setSelectedTabs(new Set());
    }
  };

  const handleSaveSession = () => {
    if (!sessionName.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a name for the session.",
      });
      return;
    }
    if (selectedTabs.size === 0) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select at least one tab to save.",
      });
      return;
    }
    const newSession: Session = {
      id: componentId,
      name: sessionName.trim(),
      createdAt: new Date().toISOString(),
      tabs: tabs.filter((tab) => selectedTabs.has(tab.id)),
    };
    setSessions([...sessions, newSession]);
    setSessionName("");
    toast({
      title: "Success",
      description: `Session "${newSession.name}" saved.`,
    });
  };

  const handleLoadSession = (sessionId: string) => {
    const session = sessions.find((s) => s.id === sessionId);
    if (session) {
      setSelectedTabs(new Set(session.tabs.map((tab) => tab.id)));
      toast({
        title: "Success",
        description: `Session "${session.name}" loaded.`,
      });
    }
  };

  const handleDeleteSession = (sessionId: string) => {
    setSessions(sessions.filter((s) => s.id !== sessionId));
    toast({
      title: "Success",
      description: "Session deleted.",
    });
  };

  const handleGenerateComment = async () => {
    if (selectedTabs.size === 0) {
      toast({
        variant: "destructive",
        title: "No tabs selected",
        description: "Please select tabs to generate a comment.",
      });
      return;
    }
    setIsGenerating(true);
    setGeneratedComment("");
    try {
      const tabsToComment = tabs.filter((tab) => selectedTabs.has(tab.id));
      const result = await generateCodeComment(tabsToComment);
      setGeneratedComment(result);
    } catch (error) {
      console.error("Failed to generate comment:", error);
      toast({
        variant: "destructive",
        title: "AI Error",
        description: "Could not generate comment. Please try again.",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleScanTabs = async () => {
    if (typeof chrome !== "undefined" && chrome.tabs) {
      chrome.tabs.query({}, (foundTabs) => {
        const formattedTabs: Tab[] = foundTabs
          .filter(tab => tab.id !== undefined && tab.url !== undefined && tab.title !== undefined)
          .map((tab) => ({
            id: tab.id!.toString(),
            title: tab.title!,
            url: tab.url!,
            favIconUrl: tab.favIconUrl || `https://www.google.com/s2/favicons?sz=64&domain_url=${new URL(tab.url!).hostname}`
          }));
        setTabs(formattedTabs);
        toast({
          title: "Scan complete",
          description: `Found ${formattedTabs.length} tabs.`,
        });
      });
    } else {
      // For local development, you can use mock data:
      setTabs(MOCK_TABS);
       toast({
        title: "Using Mock Data",
        description: "This is a development environment. Displaying sample tabs.",
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <MainHeader />
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="flex flex-col gap-8">
            <TabManagement
              tabs={filteredTabs}
              selectedTabs={selectedTabs}
              onTabSelect={handleTabSelect}
              onSelectAll={handleSelectAll}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              allTabsCount={tabs.length}
              onScanTabs={handleScanTabs}
            />
          </div>
          <div className="sticky top-8 flex flex-col gap-8">
            <SessionManagement
              sessions={sessions}
              sessionName={sessionName}
              onSessionNameChange={setSessionName}
              onSaveSession={handleSaveSession}
              onLoadSession={handleLoadSession}
              onDeleteSession={handleDeleteSession}
            />
            <CommentGenerator
              selectedTabsCount={selectedTabs.size}
              generatedComment={generatedComment}
              isGenerating={isGenerating}
              onGenerateComment={handleGenerateComment}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

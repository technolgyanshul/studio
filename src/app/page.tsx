"use client";

import * as React from "react";
import type { Tab } from "@/lib/types";

import { MainHeader } from "@/components/app/main-header";
import { TabManagement } from "@/components/app/tab-management";
import { ExportControls } from "@/components/app/export-controls";
import { useToast } from "@/hooks/use-toast";
import { ExportFormat } from "@/lib/types";

// Helper function to convert array of objects to CSV
function convertToCSV(data: Tab[]) {
  if (data.length === 0) return "";
  const headers = "title,url,favIconUrl\n";
  const rows = data
    .map(
      (tab) =>
        `"${tab.title.replace(/"/g, '""')}","${tab.url}","${
          tab.favIconUrl
        }"`
    )
    .join("\n");
  return headers + rows;
}

// Helper function to trigger file download
function downloadFile(content: string, fileName: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export default function TabIntegratorPage() {
  const { toast } = useToast();
  const [tabs, setTabs] = React.useState<Tab[]>([]);
  const [selectedTabs, setSelectedTabs] = React.useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = React.useState("");

  const [generatedOutput, setGeneratedOutput] = React.useState("");
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [format, setFormat] = React.useState<ExportFormat>("json");

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

  const handleGenerateOutput = async () => {
    if (selectedTabs.size === 0) {
      toast({
        variant: "destructive",
        title: "No tabs selected",
        description: "Please select tabs to generate output.",
      });
      return;
    }
    setIsGenerating(true);
    setGeneratedOutput("");
    try {
      const tabsToExport = tabs.filter((tab) => selectedTabs.has(tab.id));
      switch (format) {
        case "json":
          downloadFile(JSON.stringify(tabsToExport, null, 2), "tabs.json", "application/json");
          setGeneratedOutput(JSON.stringify(tabsToExport, null, 2));
          break;
        case "csv":
           const csvContent = convertToCSV(tabsToExport);
          downloadFile(csvContent, "tabs.csv", "text/csv");
          setGeneratedOutput(csvContent);
          break;
      }
    } catch (error) {
      console.error("Failed to generate output:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not generate output. Please try again.",
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
      // Instructions for running as an extension
      toast({
        variant: "destructive",
        title: "This is a Chrome Extension",
        description: "To scan real tabs, build the app and load it as an unpacked extension in Chrome.",
        duration: 8000,
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
            <ExportControls
              selectedTabsCount={selectedTabs.size}
              generatedOutput={generatedOutput}
              isGenerating={isGenerating}
              onGenerate={handleGenerateOutput}
              format={format}
              onFormatChange={setFormat}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

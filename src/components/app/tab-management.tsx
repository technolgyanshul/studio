"use client";

import type { Tab } from "@/lib/types";
import Image from "next/image";
import { BookOpen, Search } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

interface TabManagementProps {
  tabs: Tab[];
  selectedTabs: Set<string>;
  onTabSelect: (tabId: string) => void;
  onSelectAll: (checked: boolean) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  allTabsCount: number;
}

export function TabManagement({
  tabs,
  selectedTabs,
  onTabSelect,
  onSelectAll,
  searchQuery,
  onSearchChange,
  allTabsCount
}: TabManagementProps) {
  const allSelected = tabs.length > 0 && selectedTabs.size === tabs.length;

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          <BookOpen className="text-primary" />
          Active Browser Tabs
        </CardTitle>
        <CardDescription>
          Select tabs to export as code comments or save as a session.
        </CardDescription>
        <div className="relative pt-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={`Search ${allTabsCount} tabs...`}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>
      </CardHeader>
      <Separator />
      <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            <Checkbox
              id="select-all"
              checked={allSelected}
              onCheckedChange={(checked) => onSelectAll(Boolean(checked))}
              aria-label="Select all tabs"
            />
            <label htmlFor="select-all" className="text-sm font-medium">Select All</label>
          </div>
          <p className="text-sm text-muted-foreground">{selectedTabs.size} of {tabs.length} selected</p>
        </div>
      <CardContent className="p-0">
        <ScrollArea className="h-[450px]">
          {tabs.length > 0 ? (
            <div className="p-4 space-y-2">
              {tabs.map((tab) => (
                <div
                  key={tab.id}
                  onClick={() => onTabSelect(tab.id)}
                  className={`flex items-center gap-3 p-2 rounded-md cursor-pointer transition-colors duration-200 ${selectedTabs.has(tab.id) ? 'bg-primary/10' : 'hover:bg-muted/50'}`}
                >
                  <Checkbox
                    checked={selectedTabs.has(tab.id)}
                    onCheckedChange={() => onTabSelect(tab.id)}
                    aria-labelledby={`tab-title-${tab.id}`}
                  />
                  <Image
                    src={tab.favIconUrl}
                    alt=""
                    width={20}
                    height={20}
                    className="rounded"
                  />
                  <div className="flex-1 overflow-hidden">
                    <p id={`tab-title-${tab.id}`} className="text-sm font-medium truncate text-slate-200">{tab.title}</p>
                    <p className="text-xs text-muted-foreground truncate">{tab.url}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
              No tabs found.
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

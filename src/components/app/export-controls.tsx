"use client";

import * as React from "react";
import {
  Sparkles,
  Clipboard,
  Check,
  Loader2,
  Download,
  FileCode,
  FileJson,
  FileText,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { ExportFormat } from "@/lib/types";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface ExportControlsProps {
  selectedTabsCount: number;
  generatedOutput: string;
  isGenerating: boolean;
  onGenerate: () => void;
  format: ExportFormat;
  onFormatChange: (format: ExportFormat) => void;
}

const formatOptions: {
  value: ExportFormat;
  label: string;
  icon: React.ElementType;
}[] = [
  { value: "comment", label: "Code Comment", icon: FileCode },
  { value: "json", label: "JSON", icon: FileJson },
  { value: "csv", label: "CSV", icon: FileText },
];

export function ExportControls({
  selectedTabsCount,
  generatedOutput,
  isGenerating,
  onGenerate,
  format,
  onFormatChange,
}: ExportControlsProps) {
  const { toast } = useToast();
  const [hasCopied, setHasCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedOutput);
    setHasCopied(true);
    toast({ title: "Copied to clipboard!" });
    setTimeout(() => setHasCopied(false), 2000);
  };

  const handleDownload = () => {
    const fileExtension = format === 'comment' ? 'txt' : format;
    const mimeType = format === 'csv' ? 'text/csv' : 'application/json';
    
    const blob = new Blob([generatedOutput], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `tabs-export.${fileExtension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({ title: "Download started!" });
  };

  return (
    <Card className="flex-1 flex flex-col">
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          <Sparkles className="text-accent" />
          Export Controls
        </CardTitle>
        <CardDescription>
          Export selected tabs to various developer-friendly formats.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="format-select">Format</Label>
            <Select
              value={format}
              onValueChange={(value) => onFormatChange(value as ExportFormat)}
            >
              <SelectTrigger id="format-select">
                <SelectValue placeholder="Select a format" />
              </SelectTrigger>
              <SelectContent>
                {formatOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    <div className="flex items-center gap-2">
                      <opt.icon className="h-4 w-4 text-muted-foreground" />
                      <span>{opt.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2 justify-end">
            <Button
              onClick={onGenerate}
              disabled={isGenerating || selectedTabsCount === 0}
              className="bg-primary/90 hover:bg-primary text-primary-foreground"
            >
              {isGenerating ? (
                <Loader2 className="animate-spin" />
              ) : (
                <Sparkles className="text-accent" />
              )}
              Generate ({selectedTabsCount})
            </Button>
          </div>
        </div>

        <div className="relative flex-1">
          <Label htmlFor="output-textarea" className="sr-only">
            Generated Output
          </Label>
          <Textarea
            id="output-textarea"
            readOnly
            value={generatedOutput}
            placeholder={
              isGenerating
                ? "Generating output..."
                : "Generated output will appear here."
            }
            className="h-full min-h-[200px] resize-none font-code text-sm bg-gray-900/50"
          />
          {generatedOutput && !isGenerating && (
            <div className="absolute top-2 right-2 flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-primary"
                onClick={handleCopy}
                title="Copy to clipboard"
              >
                {hasCopied ? (
                  <Check className="text-green-400" />
                ) : (
                  <Clipboard />
                )}
              </Button>
               <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-primary"
                onClick={handleDownload}
                title="Download file"
              >
                <Download />
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
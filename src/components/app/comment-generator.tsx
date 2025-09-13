"use client";

import * as React from "react";
import { Sparkles, Clipboard, Check, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface CommentGeneratorProps {
  selectedTabsCount: number;
  generatedComment: string;
  isGenerating: boolean;
  onGenerateComment: () => void;
}

export function CommentGenerator({
  selectedTabsCount,
  generatedComment,
  isGenerating,
  onGenerateComment,
}: CommentGeneratorProps) {
  const { toast } = useToast();
  const [hasCopied, setHasCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedComment);
    setHasCopied(true);
    toast({ title: "Copied to clipboard!" });
    setTimeout(() => setHasCopied(false), 2000);
  };

  return (
    <Card className="flex-1 flex flex-col">
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          <Sparkles className="text-accent" />
          Generate Code Comment
        </CardTitle>
        <CardDescription>
          Use AI to generate a formatted comment from your selected tabs.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-4">
        <Button
          onClick={onGenerateComment}
          disabled={isGenerating || selectedTabsCount === 0}
          className="bg-primary/90 hover:bg-primary text-primary-foreground"
        >
          {isGenerating ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="mr-2 h-4 w-4 text-accent" />
          )}
          Generate Comment ({selectedTabsCount} tabs)
        </Button>
        <div className="relative flex-1">
          <Textarea
            readOnly
            value={generatedComment}
            placeholder={
              isGenerating 
              ? "Generating comment with AI..." 
              : "Generated comment will appear here."
            }
            className="h-full resize-none font-code text-sm bg-gray-900/50"
          />
          {generatedComment && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 h-8 w-8 text-muted-foreground hover:text-primary"
              onClick={handleCopy}
            >
              {hasCopied ? <Check className="h-4 w-4 text-green-400" /> : <Clipboard className="h-4 w-4" />}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

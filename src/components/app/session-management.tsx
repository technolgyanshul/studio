"use client";

import type { Session } from "@/lib/types";
import { Save, List, Trash2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SessionManagementProps {
  sessions: Session[];
  sessionName: string;
  onSessionNameChange: (name: string) => void;
  onSaveSession: () => void;
  onLoadSession: (sessionId: string) => void;
  onDeleteSession: (sessionId: string) => void;
}

export function SessionManagement({
  sessions,
  sessionName,
  onSessionNameChange,
  onSaveSession,
  onLoadSession,
  onDeleteSession,
}: SessionManagementProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          <Save className="text-primary" />
          Session Management
        </CardTitle>
        <CardDescription>
          Save your current tab selection or load a previous session.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="New session name..."
            value={sessionName}
            onChange={(e) => onSessionNameChange(e.target.value)}
          />
          <Button onClick={onSaveSession}>Save</Button>
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                <span>Load or Delete Session</span>
                <List className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full min-w-[300px]" align="start">
              <DropdownMenuLabel>Saved Sessions ({sessions.length})</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {sessions.length > 0 ? (
                sessions
                  .sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                  .map((session) => (
                    <DropdownMenuItem
                      key={session.id}
                      className="flex justify-between items-center"
                      onSelect={(e) => e.preventDefault()}
                    >
                      <div onClick={() => onLoadSession(session.id)} className="flex-1 cursor-pointer">
                        <p className="font-medium">{session.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {session.tabs.length} tabs, saved {formatDistanceToNow(new Date(session.createdAt), { addSuffix: true })}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-muted-foreground hover:text-destructive"
                        onClick={() => onDeleteSession(session.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </DropdownMenuItem>
                  ))
              ) : (
                <DropdownMenuItem disabled>No sessions saved.</DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
}

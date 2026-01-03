"use client";

import { Ban } from "lucide-react";

export default function SettingsPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4 animate-in fade-in zoom-in-95 duration-500">
            <div className="p-4 bg-muted rounded-full">
                <Ban className="h-10 w-10 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
            <p className="text-muted-foreground max-w-sm">
                This feature is currently under development or disabled for this demo environment.
            </p>
            <button className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:bg-primary/90 transition-colors">
                Return to Dashboard
            </button>
        </div>
    );
}

"use client";

import { HelpCircle } from "lucide-react";

export default function HelpPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4 animate-in fade-in zoom-in-95 duration-500">
            <div className="p-4 bg-muted rounded-full">
                <HelpCircle className="h-10 w-10 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Help Center</h1>
            <p className="text-muted-foreground max-w-sm">
                Need assistance? Contact support@oddo.com for help with the HR Management System.
            </p>
            <button className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:bg-primary/90 transition-colors">
                Contact Support
            </button>
        </div>
    );
}

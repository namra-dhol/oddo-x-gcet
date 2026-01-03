"use client";

import { LayoutDashboard, Users, CalendarCheck, Clock, Menu, ChevronLeft, ChevronRight, Settings, HelpCircle, Bell } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/app/lib/utils";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const sidebarItems = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Employees",
        href: "/employees",
        icon: Users,
    },
    {
        title: "Attendance",
        href: "/attendance",
        icon: CalendarCheck,
    },
    {
        title: "Time Off",
        href: "/time-off",
        icon: Clock,
    },
];

const secondaryItems = [
    {
        title: "Settings",
        href: "/settings",
        icon: Settings,
    },
    {
        title: "Help Center",
        href: "/help",
        icon: HelpCircle,
    },
];

export function Sidebar() {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    return (
        <>
            {/* Mobile Trigger */}
            <button
                className="lg:hidden fixed top-3 left-3 z-50 p-2 bg-background border rounded-md shadow-sm"
                onClick={() => setIsMobileOpen(!isMobileOpen)}
            >
                <Menu className="h-5 w-5" />
            </button>

            {/* Sidebar */}
            <aside className={cn(
                "fixed inset-y-0 left-0 z-40 h-screen bg-card border-r border-border transition-all duration-300 ease-in-out flex flex-col",
                "lg:static lg:h-screen lg:shrink-0", /* Added lg:static to participate in flex layout */
                isCollapsed ? "w-20 lg:w-20" : "w-64 lg:w-64",
                isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
            )}>
                {/* Header */}
                <div className="h-16 flex items-center px-4 border-b border-border">
                    <div className="flex items-center gap-3 overflow-hidden">
                        <div className="h-9 w-9 bg-primary text-primary-foreground rounded-lg flex-shrink-0 flex items-center justify-center font-bold text-lg">
                            DF
                        </div>
                        {!isCollapsed && (
                            <span className="font-semibold text-lg tracking-tight truncate">
                                Dayflow
                            </span>
                        )}
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex-1 py-6 px-3 space-y-6 overflow-y-auto custom-scrollbar">

                    {/* Main Group */}
                    <div>
                        {!isCollapsed && <p className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Platform</p>}
                        <nav className="space-y-1">
                            {sidebarItems.map((item) => {
                                const isActive = pathname === item.href;
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn(
                                            "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors relative group",
                                            isActive
                                                ? "bg-primary text-primary-foreground"
                                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                        )}
                                    >
                                        <Icon className={cn("h-5 w-5 flex-shrink-0", isActive ? "text-primary-foreground" : "")} />

                                        {!isCollapsed && <span>{item.title}</span>}

                                        {/* Tooltip for collapsed state */}
                                        {isCollapsed && (
                                            <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded shadow-md border opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">
                                                {item.title}
                                            </div>
                                        )}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>

                    {/* Secondary Group */}
                    <div>
                        {!isCollapsed && <p className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Support</p>}
                        <nav className="space-y-1">
                            {secondaryItems.map((item) => {
                                const isActive = pathname === item.href;
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn(
                                            "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors relative group",
                                            isActive
                                                ? "bg-primary text-primary-foreground"
                                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                        )}
                                    >
                                        <Icon className={cn("h-5 w-5 flex-shrink-0", isActive ? "text-primary-foreground" : "")} />
                                        {!isCollapsed && <span>{item.title}</span>}
                                        {isCollapsed && (
                                            <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded shadow-md border opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">
                                                {item.title}
                                            </div>
                                        )}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>

                </div>

                {/* Footer / Toggle */}
                <div className="p-4 border-t border-border">
                    {!isCollapsed ? (
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium">JD</div>
                            <div className="flex-1 overflow-hidden">
                                <p className="text-sm font-medium truncate">John Doe</p>
                                <p className="text-xs text-muted-foreground truncate">john@company.com</p>
                            </div>
                            <button onClick={() => setIsCollapsed(true)} className="p-1 hover:bg-muted rounded">
                                <ChevronLeft className="h-4 w-4 text-muted-foreground" />
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-4">
                            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium">JD</div>
                            <button onClick={() => setIsCollapsed(false)} className="p-1 hover:bg-muted rounded">
                                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                            </button>
                        </div>
                    )}
                </div>
            </aside>

            {/* Overlay */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm lg:hidden"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}
        </>
    );
}

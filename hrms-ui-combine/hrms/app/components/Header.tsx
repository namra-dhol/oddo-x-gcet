"use client";

import { Bell, Search, MessageSquare, HelpCircle, LogOut, User, CheckCircle2, X, Sun, Moon, ChevronRight, Home } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/app/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

function ThemeToggle() {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        // Check system preference or localStorage on mount
        if (document.documentElement.classList.contains("dark")) {
            setIsDark(true);
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = !isDark;
        setIsDark(newTheme);
        if (newTheme) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    };

    return (
        <button
            onClick={toggleTheme}
            className="p-2 hover:bg-muted rounded-full transition-colors relative overflow-hidden"
            title="Toggle Theme"
        >
            <div className="relative h-5 w-5">
                <Sun className={cn("h-5 w-5 absolute inset-0 transition-transform duration-500 rotate-0 scale-100", isDark && "-rotate-90 scale-0")} />
                <Moon className={cn("h-5 w-5 absolute inset-0 transition-transform duration-500 rotate-90 scale-0", isDark && "rotate-0 scale-100")} />
            </div>
        </button>
    );
}

function NotificationDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState([
        { id: 1, title: "New Leave Request", desc: "Alice Johnson requested Sick Leave", time: "10 min ago", unread: true },
        { id: 2, title: "System Update", desc: "HRMS v2.0 scheduled for tonight", time: "2 hours ago", unread: true },
        { id: 3, title: "Monthly Report", desc: "October attendance report is ready", time: "5 hours ago", unread: false },
    ]);

    const unreadCount = notifications.filter(n => n.unread).length;

    const handleRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 hover:bg-muted rounded-full transition-colors"
            >
                <Bell className="h-5 w-5 text-muted-foreground" />
                {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-background"></span>
                )}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.1 }}
                            className="absolute right-0 top-full mt-2 w-80 rounded-xl border bg-popover shadow-xl text-popover-foreground z-50 overflow-hidden"
                        >
                            <div className="flex items-center justify-between px-4 py-3 border-b bg-muted/30">
                                <h3 className="font-semibold text-sm">Notifications</h3>
                                {unreadCount > 0 && (
                                    <button onClick={handleRead} className="text-xs text-primary hover:underline">
                                        Mark all read
                                    </button>
                                )}
                            </div>
                            <div className="max-h-[300px] overflow-y-auto">
                                {notifications.length > 0 ? (
                                    notifications.map((n) => (
                                        <div key={n.id} className={cn("px-4 py-3 border-b border-border/50 hover:bg-muted/50 transition-colors flex gap-3", n.unread && "bg-primary/5")}>
                                            <div className={cn("h-2 w-2 mt-1.5 rounded-full shrink-0", n.unread ? "bg-primary" : "bg-transparent")} />
                                            <div>
                                                <p className={cn("text-sm font-medium", n.unread ? "text-foreground" : "text-muted-foreground")}>{n.title}</p>
                                                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{n.desc}</p>
                                                <p className="text-[10px] text-muted-foreground/70 mt-1">{n.time}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-8 text-center text-muted-foreground text-sm">
                                        No new notifications
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}

export function Header() {
    const [isCheckedIn, setIsCheckedIn] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const pathname = usePathname();

    const handleCheckInToggle = () => {
        setIsCheckedIn(!isCheckedIn);
    };

    // Breadcrumbs Logic
    const segments = pathname.split('/').filter(Boolean);
    const breadcrumbs = segments.map((segment, index) => {
        const href = `/${segments.slice(0, index + 1).join('/')}`;
        const isLast = index === segments.length - 1;
        const title = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
        return { href, title, isLast };
    });

    return (
        <header className="sticky top-0 z-30 flex h-16 w-full items-center gap-4 border-b bg-background px-6 shadow-sm">
            {/* Mobile Space Helper */}
            <div className="lg:hidden w-12" />

            {/* Breadcrumbs */}
            <div className="flex-1 hidden md:flex items-center gap-2 text-sm text-muted-foreground">
                <Link href="/dashboard" className="flex items-center gap-1 hover:text-foreground transition-colors">
                    <Home className="h-4 w-4" />
                </Link>
                {breadcrumbs.length > 0 && <ChevronRight className="h-4 w-4 text-muted-foreground/50" />}
                {breadcrumbs.map((crumb, i) => (
                    <div key={crumb.href} className="flex items-center gap-2">
                        {crumb.isLast ? (
                            <span className="font-medium text-foreground">{crumb.title}</span>
                        ) : (
                            <Link href={crumb.href} className="hover:text-foreground transition-colors">
                                {crumb.title}
                            </Link>
                        )}
                        {!crumb.isLast && <ChevronRight className="h-4 w-4 text-muted-foreground/50" />}
                    </div>
                ))}
            </div>

            <div className="flex-1 md:hidden" /> {/* Spacer for mobile */}

            <div className="h-6 w-px bg-border mx-2 hidden sm:block"></div>

            {/* User Actions */}
            <div className="flex items-center gap-2">

                {/* Theme Switcher */}
                <ThemeToggle />

                {/* Notification Center */}
                <NotificationDropdown />

                <div className="relative">
                    <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="flex items-center gap-2 hover:bg-muted/50 p-1 pr-3 rounded-full transition-colors border border-transparent hover:border-border"
                    >
                        <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-primary to-blue-400 flex items-center justify-center text-white font-bold text-xs ring-2 ring-background">
                            JD
                        </div>
                        <span className="text-sm font-medium hidden md:block">John Doe</span>
                    </button>

                    {/* Profile Dropdown */}
                    <AnimatePresence>
                        {isProfileOpen && (
                            <>
                                <div
                                    className="fixed inset-0 z-40"
                                    onClick={() => setIsProfileOpen(false)}
                                />
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    transition={{ duration: 0.1 }}
                                    className="absolute right-0 top-full mt-2 w-56 rounded-xl border bg-popover p-1 shadow-lg text-popover-foreground z-50 overflow-hidden"
                                >
                                    <div className="px-3 py-2 border-b border-border/50 mb-1">
                                        <p className="text-sm font-medium">My Account</p>
                                        <p className="text-xs text-muted-foreground">john.doe@company.com</p>
                                    </div>
                                    <Link href="/employees/1" className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-muted transition-colors">
                                        <User className="h-4 w-4" />
                                        My Profile
                                    </Link>
                                    <Link href="/attendance" className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-muted transition-colors">
                                        <CheckCircle2 className="h-4 w-4" />
                                        Attendance Log
                                    </Link>
                                    <div className="border-t border-border/50 my-1"></div>
                                    <button
                                        onClick={() => window.location.href = '/'}
                                        className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                                    >
                                        <LogOut className="h-4 w-4" />
                                        Log Out
                                    </button>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </header>
    );
}

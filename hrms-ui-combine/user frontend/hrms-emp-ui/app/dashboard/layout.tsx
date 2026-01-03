"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    CalendarCheck,
    FileText,
    DollarSign,
    User,
    LogOut,
    Menu
} from "lucide-react";
import { useState } from "react";

const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'My Attendance', href: '/dashboard/attendance', icon: CalendarCheck },
    { name: 'My Leaves', href: '/dashboard/leaves', icon: FileText },
    { name: 'My Salary', href: '/dashboard/payroll', icon: DollarSign },
    { name: 'Profile', href: '/dashboard/profile', icon: User },
];

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[var(--background)] flex">
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-[var(--card-bg)] border-r border-[var(--border)]
        transform transition-transform duration-200 lg:translate-x-0 lg:static
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
                <div className="h-16 flex items-center px-6 border-b border-[var(--border)]">
                    <h1 className="text-xl font-bold tracking-tight">Dayflow</h1>
                </div>

                <nav className="p-4 space-y-1">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`
                  flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-colors
                  ${isActive
                                        ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                                        : 'text-[var(--muted-foreground)] hover:bg-[var(--muted-bg)] hover:text-[var(--foreground)]'}
                `}
                            >
                                <item.icon className="w-5 h-5 mr-3" />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="absolute bottom-0 w-full p-4 border-t border-[var(--border)]">
                    <Link
                        href="/"
                        className="flex items-center px-4 py-2.5 text-sm font-medium text-[var(--danger)] rounded-md hover:bg-[var(--danger-bg)] transition-colors"
                    >
                        <LogOut className="w-5 h-5 mr-3" />
                        Sign Out
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <header className="h-16 flex items-center justify-between px-4 lg:px-8 border-b border-[var(--border)] bg-[var(--background)]">
                    <button
                        type="button"
                        className="lg:hidden p-2 -ml-2 text-[var(--muted-foreground)]"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <Menu className="w-6 h-6" />
                    </button>

                    <div className="flex items-center gap-4 ml-auto">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-[var(--muted-bg)] flex items-center justify-center text-sm font-medium border border-[var(--border)]">
                                JD
                            </div>
                            <div className="hidden md:block text-sm">
                                <p className="font-medium text-[var(--foreground)]">John Doe</p>
                                <p className="text-xs text-[var(--muted)]">Software Engineer</p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-4 lg:p-8 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}

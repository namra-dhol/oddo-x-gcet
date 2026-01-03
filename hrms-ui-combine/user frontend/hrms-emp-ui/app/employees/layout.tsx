"use client";

import React, { useState } from 'react';
import { Sidebar } from '@/app/components/employees/Sidebar/Sidebar';
import { Header } from '@/app/components/employees/Header/Header';
import { PageTransition } from '@/app/components/ui/PageTransition';

export default function EmployeesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen w-full bg-slate-50">
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            <div className="flex flex-col flex-1 w-full min-h-screen transition-all duration-300 min-[1200px]:ml-[280px]">
                <Header onMenuClick={() => setIsSidebarOpen(true)} />

                <main className="flex-1 p-6 md:p-8 lg:p-10 z-10">
                    <div className="max-w-7xl mx-auto">
                        <PageTransition>
                            {children}
                        </PageTransition>
                    </div>
                </main>
            </div>
        </div>
    );
}
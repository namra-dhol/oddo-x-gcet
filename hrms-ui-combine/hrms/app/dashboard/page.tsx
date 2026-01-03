"use client";

import Link from "next/link";
import { StatsCard } from "@/app/components/StatsCard";
import { Users, Clock, AlertCircle, TrendingUp, MoreHorizontal, UserCheck } from "lucide-react";
import { cn } from "@/app/lib/utils";
import { useState } from "react";

export default function DashboardPage() {

    const handleDownloadReport = () => {
        // Mock data generation for last 30 days analysis
        const headers = ["Date", "Total Employees", "Present", "Absent", "On Leave", "New Hires"];
        const rows = Array.from({ length: 30 }).map((_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - (29 - i));
            return [
                date.toISOString().split('T')[0],
                1200 + Math.floor(Math.random() * 50), // Total
                1100 + Math.floor(Math.random() * 50), // Present
                50 + Math.floor(Math.random() * 20),   // Absent
                20 + Math.floor(Math.random() * 10),   // On Leave
                Math.floor(Math.random() * 3)          // New Hires
            ];
        });

        const csvContent = "data:text/csv;charset=utf-8,"
            + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "hrms_analysis_last_30_days.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const [chartPeriod, setChartPeriod] = useState<"12M" | "6M" | "30D">("12M");

    const chartData = {
        "12M": [
            { label: "Jan", value: 65 }, { label: "Feb", value: 59 }, { label: "Mar", value: 80 },
            { label: "Apr", value: 81 }, { label: "May", value: 56 }, { label: "Jun", value: 55 },
            { label: "Jul", value: 40 }, { label: "Aug", value: 70 }, { label: "Sep", value: 75 },
            { label: "Oct", value: 60 }, { label: "Nov", value: 90 }, { label: "Dec", value: 100 }
        ],
        "6M": [
            { label: "Jul", value: 40 }, { label: "Aug", value: 70 }, { label: "Sep", value: 75 },
            { label: "Oct", value: 60 }, { label: "Nov", value: 90 }, { label: "Dec", value: 100 }
        ],
        "30D": [
            { label: "W1", value: 20 }, { label: "W2", value: 45 }, { label: "W3", value: 30 }, { label: "W4", value: 50 }
        ]
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                    <p className="text-muted-foreground">Overview of organization performance and employee status.</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={handleDownloadReport}
                        className="px-4 py-2 bg-background border rounded-md text-sm font-medium hover:bg-muted transition-colors flex items-center gap-2"
                    >
                        <TrendingUp className="h-4 w-4" />
                        Download 30-Day Analysis
                    </button>
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatsCard
                    title="Total Employees"
                    value="1,234"
                    icon={Users}
                    description="+20 from last month"
                    trend={{ value: 12, label: "growth" }}
                />
                <StatsCard
                    title="Attendance Rate"
                    value="95.2%"
                    icon={UserCheck}
                    description="Average daily check-ins"
                    trend={{ value: 2.1, label: "improvement" }}
                />
                <StatsCard
                    title="On Leave"
                    value="24"
                    icon={Clock}
                    description="Currently absent"
                    trend={{ value: -5, label: "decrease" }}
                />
                <StatsCard
                    title="Pending Requests"
                    value="12"
                    icon={AlertCircle}
                    description="Requires approval"
                    trend={{ value: 4, label: "new" }}
                />
            </div>

            <div className="grid gap-4 grid-cols-1 lg:grid-cols-7">

                {/* Main Chart Section */}
                <div className="lg:col-span-4 rounded-xl border bg-card text-card-foreground shadow-sm">
                    <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                        <div className="space-y-1">
                            <h3 className="tracking-tight text-sm font-medium">Headcount Growth</h3>
                            <p className="text-xs text-muted-foreground">Employee trend over time</p>
                        </div>

                        {/* Period Toggle */}
                        <div className="flex items-center bg-muted/50 rounded-lg p-1">
                            {(["12M", "6M", "30D"] as const).map((period) => (
                                <button
                                    key={period}
                                    onClick={() => setChartPeriod(period)}
                                    className={cn(
                                        "px-3 py-1 text-xs font-medium rounded-md transition-all",
                                        chartPeriod === period
                                            ? "bg-background shadow text-foreground"
                                            : "text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    {period}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="p-6 pt-4 pl-2">
                        <div className="h-[300px] w-full bg-muted/5 dashed-grid rounded-lg flex items-end justify-between px-4 pb-0 gap-2 relative">
                            {/* Grid Lines (Visual) */}
                            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10 p-4 pb-8">
                                <div className="border-t border-foreground w-full"></div>
                                <div className="border-t border-foreground w-full"></div>
                                <div className="border-t border-foreground w-full"></div>
                                <div className="border-t border-foreground w-full"></div>
                            </div>

                            {chartData[chartPeriod].map((data, i) => (
                                <div key={i} className="group relative flex-1 bg-primary/80 hover:bg-primary rounded-t-sm transition-all duration-500 ease-in-out" style={{ height: `${data.value}%` }}>
                                    {/* Tooltip */}
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground text-xs font-bold px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 border pointer-events-none">
                                        {data.value} Employees
                                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-popover rotate-45 border-r border-b border-popover/0 border-l-0 border-t-0"></div>
                                    </div>
                                    {/* Label */}
                                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] sm:text-xs text-muted-foreground font-medium">
                                        {data.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="h-4"></div> {/* Spacer for labels */}
                    </div>
                </div>

                {/* Recent Activity Feed */}
                <div className="lg:col-span-3 rounded-xl border bg-card text-card-foreground shadow-sm">
                    <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                        <h3 className="tracking-tight text-sm font-medium">Recent Activity</h3>
                        <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="p-6 pt-0">
                        <div className="space-y-6 mt-4">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="flex items-start gap-4">
                                    <span className="relative flex h-2 w-2 translate-y-1.5 rounded-full bg-primary" />
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium leading-none">
                                            New leave request from <Link href="/employees/1" className="text-primary hover:underline">Alice Smith</Link>
                                        </p>
                                        <p className="text-xs text-muted-foreground">2 hours ago</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

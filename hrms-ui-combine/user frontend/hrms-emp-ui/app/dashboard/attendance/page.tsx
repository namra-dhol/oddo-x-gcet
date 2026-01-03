"use client";

import { useState } from "react";
import { Badge } from "@/app/components/employees/Badge/Badge";
import { Button } from "@/app/components/employees/Button/Button";
import { Calendar as CalendarIcon, Filter, Clock } from "lucide-react";

export default function AttendancePage() {
    const [logs] = useState([
        { id: 1, date: "2026-01-03", day: "Saturday", checkIn: "09:00 AM", checkOut: "Ongoing", status: "present", hours: "4h 23m" },
        { id: 2, date: "2026-01-02", day: "Friday", checkIn: "09:10 AM", checkOut: "06:15 PM", status: "present", hours: "9h 05m" },
        { id: 3, date: "2026-01-01", day: "Thursday", checkIn: "-", checkOut: "-", status: "absent", hours: "0" },
        { id: 4, date: "2025-12-31", day: "Wednesday", checkIn: "09:00 AM", checkOut: "01:00 PM", status: "half_day", hours: "4h 00m" },
    ]);

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "present": return <Badge status="success" text="Present" />;
            case "absent": return <Badge status="danger" text="Absent" />;
            case "half_day": return <Badge status="warning" text="Half Day" />;
            default: return <Badge status="neutral" text={status} />;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">My Attendance</h2>
                    <p className="text-[var(--muted)] text-sm">View your monthly attendance history.</p>
                </div>
                <div className="flex gap-2">
                    <div className="hidden sm:flex items-center gap-2 text-sm text-[var(--muted)] mr-4">
                        <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[var(--success)]"></div> Present: 18</span>
                        <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[var(--danger)]"></div> Absent: 2</span>
                    </div>
                    <Button variant="outline" size="md">
                        <CalendarIcon className="w-4 h-4" />
                        January 2026
                    </Button>
                </div>
            </div>

            <div className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card-bg)] overflow-hidden shadow-[var(--shadow-sm)]">
                <table className="w-full text-sm text-left">
                    <thead className="bg-[var(--muted-bg)] border-b border-[var(--border)]">
                        <tr>
                            <th className="px-6 py-3 font-medium text-[var(--muted-foreground)]">Date</th>
                            <th className="px-6 py-3 font-medium text-[var(--muted-foreground)]">Day</th>
                            <th className="px-6 py-3 font-medium text-[var(--muted-foreground)]">Status</th>
                            <th className="px-6 py-3 font-medium text-[var(--muted-foreground)]">Check In</th>
                            <th className="px-6 py-3 font-medium text-[var(--muted-foreground)]">Check Out</th>
                            <th className="px-6 py-3 font-medium text-[var(--muted-foreground)]">Total Hours</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border)]">
                        {logs.map((log) => (
                            <tr key={log.id} className="hover:bg-[var(--muted-bg)]/50 transition-colors">
                                <td className="px-6 py-4 font-medium text-[var(--foreground)]">{log.date}</td>
                                <td className="px-6 py-4 text-[var(--muted-foreground)]">{log.day}</td>
                                <td className="px-6 py-4">
                                    {getStatusBadge(log.status)}
                                </td>
                                <td className="px-6 py-4 text-[var(--muted-foreground)]">{log.checkIn}</td>
                                <td className="px-6 py-4 text-[var(--muted-foreground)]">{log.checkOut}</td>
                                <td className="px-6 py-4 font-mono text-xs flex items-center gap-2">
                                    <Clock className="w-3 h-3 text-[var(--muted)]" />
                                    {log.hours}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

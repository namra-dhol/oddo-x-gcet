"use client";

import { Clock, Calendar, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "../components/employees/Button/Button";
import { useState, useEffect } from "react";

export default function DashboardPage() {
    const [isCheckedIn, setIsCheckedIn] = useState(false);
    const [checkInTime, setCheckInTime] = useState<string | null>(null);
    const [currentTime, setCurrentTime] = useState<string>("");

    useEffect(() => {
        // Update clock every second
        const timer = setInterval(() => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const handleCheckIn = () => {
        setIsCheckedIn(true);
        setCheckInTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };

    const handleCheckOut = () => {
        setIsCheckedIn(false);
        setCheckInTime(null);
    };

    const stats = [
        { label: "Hours Today", value: isCheckedIn ? "Counting..." : "00:00", icon: Clock, sub: checkInTime ? `Checked in at ${checkInTime}` : "Not checked in yet" },
        { label: "Leave Balance", value: "12 Days", icon: Calendar, sub: "Casual: 8, Sick: 4" },
        { label: "Attendance Rate", value: "98%", icon: CheckCircle2, sub: "This Month" },
        { label: "Approvals", value: "Pending", icon: AlertCircle, sub: "1 Leave Request" },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Welcome back, John!</h2>
                <p className="text-[var(--muted)] mt-1">Here is your daily activity overview.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        className="p-6 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card-bg)] shadow-[var(--shadow-sm)] hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-medium text-[var(--muted-foreground)]">{stat.label}</span>
                            <stat.icon className="h-4 w-4 text-[var(--muted)]" />
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-[var(--foreground)]">{stat.value}</span>
                        </div>
                        <p className="mt-1 text-xs text-[var(--muted)]">{stat.sub}</p>
                    </div>
                ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Attendance Widget */}
                <div className="lg:col-span-2 p-6 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card-bg)] shadow-[var(--shadow-sm)]">
                    <h3 className="text-lg font-medium mb-4">Mark Attendance</h3>
                    <div className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-[var(--muted-bg)] rounded-[var(--radius)] border border-[var(--border)]">
                        <div className="text-center sm:text-left">
                            <p className="text-sm text-[var(--muted-foreground)]">Current Time</p>
                            <h4 className="text-xl font-bold">{currentTime || "--:--"}</h4>
                            <p className={`text-sm mt-1 font-medium ${isCheckedIn ? "text-[var(--success)]" : "text-[var(--muted-foreground)]"}`}>
                                {isCheckedIn ? "● You are currently Checked In" : "○ You are currently Checked Out"}
                            </p>
                        </div>
                        <div className="sm:ml-auto flex gap-3">
                            {!isCheckedIn ? (
                                <Button variant="primary" size="lg" onClick={handleCheckIn}>
                                    Check In
                                </Button>
                            ) : (
                                <Button variant="danger" size="lg" onClick={handleCheckOut}>
                                    Check Out
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Notices / Holidays */}
                <div className="p-6 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card-bg)] shadow-[var(--shadow-sm)]">
                    <h3 className="text-lg font-medium mb-4">Upcoming Holidays</h3>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] flex items-center justify-center font-bold text-xs">
                                JAN
                                <br />
                                26
                            </div>
                            <div>
                                <p className="font-medium text-sm">Republic Day</p>
                                <p className="text-xs text-[var(--muted)]">Wednesday</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-full bg-[var(--muted)] text-white flex items-center justify-center font-bold text-xs">
                                MAR
                                <br />
                                25
                            </div>
                            <div>
                                <p className="font-medium text-sm">Holi</p>
                                <p className="text-xs text-[var(--muted)]">Monday</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


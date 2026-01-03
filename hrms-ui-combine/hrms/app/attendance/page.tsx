"use client";

import { Download, Upload, Search, ChevronLeft, ChevronRight, Calendar as CalendarIcon, Info } from "lucide-react";
import { useState } from "react";
import { cn } from "@/app/lib/utils";

// Mock Data matching the wireframe
const attendanceRecords = [
    { id: 1, user: "Alice Johnson", checkIn: "10:00", checkOut: "19:00", workHours: "09:00", extraHours: "01:00", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice" },
    { id: 2, user: "Bob Smith", checkIn: "10:00", checkOut: "18:00", workHours: "08:00", extraHours: "00:00", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob" },
    { id: 3, user: "Charlie Brown", checkIn: "09:30", checkOut: "19:30", workHours: "10:00", extraHours: "02:00", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie" },
    { id: 4, user: "Diana Prince", checkIn: "10:15", checkOut: "19:15", workHours: "09:00", extraHours: "01:00", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Diana" },
];

export default function AttendancePage() {
    // State
    const [searchTerm, setSearchTerm] = useState("");
    const [date, setDate] = useState(new Date("2025-10-22"));

    const handlePrevDay = () => {
        const newDate = new Date(date);
        newDate.setDate(date.getDate() - 1);
        setDate(newDate);
    };

    const handleNextDay = () => {
        const newDate = new Date(date);
        newDate.setDate(date.getDate() + 1);
        setDate(newDate);
    };

    const formattedDate = date.toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" });
    const dayName = date.toLocaleDateString("en-US", { weekday: "long" });

    // Filter
    const filteredRecords = attendanceRecords.filter(record =>
        record.user.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6 animate-in fade-in duration-500">

            {/* Info Note (As requested in the "Important" text of the prompt) */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-4 text-amber-900/80 text-sm">
                <Info className="h-5 w-5 text-amber-600 mt-0.5" />
                <div className="space-y-2">
                    <p className="font-semibold text-amber-800">Note</p>
                    <p>
                        This view shows day-wise attendance. For Admins/Time off officers, this list displays all employees present on the current day.
                        Attendance data serves as the basis for payslip generation (Payable Days).
                    </p>
                </div>
            </div>

            {/* Admin Header & Controls */}
            <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Attendance</h2>
                        <p className="text-muted-foreground">Admin List View</p>
                    </div>
                    <button
                        onClick={() => {
                            const headers = ["Employee ID", "Name", "Date", "Check In", "Check Out", "Status"];
                            const rows = attendanceRecords.map(record => [
                                record.id,
                                record.user,
                                "2025-10-22", // Using fixed date from mock
                                record.checkIn,
                                record.checkOut,
                                "Present"
                            ]);
                            const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
                            const encodedUri = encodeURI(csvContent);
                            const link = document.createElement("a");
                            link.setAttribute("href", encodedUri);
                            link.setAttribute("download", "attendance_log_2025-10-22.csv");
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-background border rounded-md text-sm font-medium hover:bg-muted transition-colors"
                    >
                        <Download className="h-4 w-4" />
                        Download Log
                    </button>
                </div>

                {/* Control Bar */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-card border rounded-xl shadow-sm">

                    {/* Search */}
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search employee..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-muted/30 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
                        />
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end">
                        <div className="flex items-center gap-1">
                            <button onClick={handlePrevDay} className="p-2 border rounded-md hover:bg-muted transition-colors">
                                <ChevronLeft className="h-4 w-4" />
                            </button>
                            <button onClick={handleNextDay} className="p-2 border rounded-md hover:bg-muted transition-colors">
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="flex items-center gap-2 px-4 py-2 border rounded-md bg-background shadow-sm w-44 justify-center">
                            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium text-sm whitespace-nowrap">{formattedDate}</span>
                        </div>

                        <div className="px-4 py-2 bg-primary/10 text-primary rounded-md text-sm font-medium border border-primary/20 w-28 text-center">
                            {dayName}
                        </div>
                    </div>
                </div>
            </div>

            {/* Data Table */}
            <div className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden min-h-[300px]">
                <div className="p-4 bg-muted/20 border-b font-medium text-sm text-center md:text-left">
                    Date: <span className="font-bold">{formattedDate}</span>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-muted/50 text-muted-foreground font-medium">
                            <tr>
                                <th className="h-12 px-6 align-middle font-medium w-1/3">Emp</th>
                                <th className="h-12 px-6 align-middle font-medium">Check In</th>
                                <th className="h-12 px-6 align-middle font-medium">Check Out</th>
                                <th className="h-12 px-6 align-middle font-medium">Work Hours</th>
                                <th className="h-12 px-6 align-middle font-medium text-right">Extra hours</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {filteredRecords.length > 0 ? (
                                filteredRecords.map((record) => (
                                    <tr key={record.id} className="hover:bg-muted/50 transition-colors group">
                                        <td className="p-4 px-6 align-middle">
                                            <div className="flex items-center gap-3">
                                                <div className="h-8 w-8 rounded-full bg-muted overflow-hidden border">
                                                    <img src={record.avatar} alt={record.user} className="h-full w-full object-cover" />
                                                </div>
                                                <span className="font-medium group-hover:text-primary transition-colors">{record.user}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 px-6 align-middle font-mono text-muted-foreground">{record.checkIn}</td>
                                        <td className="p-4 px-6 align-middle font-mono text-muted-foreground">{record.checkOut}</td>
                                        <td className="p-4 px-6 align-middle font-mono font-medium">{record.workHours}</td>
                                        <td className="p-4 px-6 align-middle font-mono text-right text-muted-foreground">{record.extraHours}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-muted-foreground">
                                        No attendance records found for this day.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

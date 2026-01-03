"use client";

import { CheckCircle, Search, Calendar, FileText, Ban } from "lucide-react";
import { cn } from "@/app/lib/utils";
import { useState } from "react";

// Mock Data matching `leave_requests` schema from request
const leaveRequests = [
    {
        id: 101,
        employeeId: 1,
        employeeName: "Alice Johnson",
        type: "Sick Leave",
        startDate: "2023-10-24",
        endDate: "2023-10-26",
        reason: "Viral Fever, doctor advised rest.",
        attachmentUrl: "#",
        status: "pending"
    },
    {
        id: 102,
        employeeId: 2,
        employeeName: "Bob Smith",
        type: "Casual Leave",
        startDate: "2023-11-01",
        endDate: "2023-11-02",
        reason: "Family function attendance.",
        attachmentUrl: "",
        status: "approved"
    },
    {
        id: 103,
        employeeId: 3,
        employeeName: "Charlie Brown",
        type: "Unpaid Leave",
        startDate: "2023-10-20",
        endDate: "2023-10-20",
        reason: "Personal errands.",
        attachmentUrl: "#",
        status: "rejected"
    },
    {
        id: 104,
        employeeId: 4,
        employeeName: "Diana Prince",
        type: "Sick Leave",
        startDate: "2023-10-27",
        endDate: "2023-10-28",
        reason: "Migraine.",
        attachmentUrl: "",
        status: "pending"
    },
];

export default function LeaveRequestsPage() {
    const [requests, setRequests] = useState(leaveRequests);
    const [searchTerm, setSearchTerm] = useState("");

    const handleAction = (id: number, newStatus: string) => {
        setRequests(prev => prev.map(req =>
            req.id === id ? { ...req, status: newStatus } : req
        ));
    };

    const filteredRequests = requests.filter(req =>
        req.employeeName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Leave Requests</h2>
                    <p className="text-muted-foreground">Admin Queue for processing employee leave applications.</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search by name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 text-sm rounded-md border bg-background focus:ring-1 focus:ring-primary outline-none"
                        />
                    </div>
                </div>
            </div>

            {/* Main Table Card */}
            <div className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden min-h-[400px]">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-muted/50 text-muted-foreground font-medium">
                            <tr>
                                <th className="h-12 px-6 align-middle font-medium">Employee</th>
                                <th className="h-12 px-6 align-middle font-medium">Type</th>
                                <th className="h-12 px-6 align-middle font-medium">Dates</th>
                                <th className="h-12 px-6 align-middle font-medium">Reason</th>
                                <th className="h-12 px-6 align-middle font-medium text-center">Attachment</th>
                                <th className="h-12 px-6 align-middle font-medium">Status / Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {filteredRequests.length > 0 ? (
                                filteredRequests.map((req) => (
                                    <tr key={req.id} className="hover:bg-muted/50 transition-colors">
                                        <td className="p-4 px-6 align-middle">
                                            <div className="flex flex-col">
                                                <span className="font-medium text-foreground">{req.employeeName}</span>
                                                <span className="text-xs text-muted-foreground">ID: #{req.employeeId}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 px-6 align-middle">
                                            <span className={cn(
                                                "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset",
                                                req.type === "Sick Leave" ? "bg-red-50 text-red-700 ring-red-600/20" :
                                                    req.type === "Casual Leave" ? "bg-blue-50 text-blue-700 ring-blue-600/20" :
                                                        "bg-gray-50 text-gray-600 ring-gray-500/10"
                                            )}>
                                                {req.type}
                                            </span>
                                        </td>
                                        <td className="p-4 px-6 align-middle">
                                            <div className="flex flex-col text-xs">
                                                <div className="flex items-center gap-1.5">
                                                    <Calendar className="h-3 w-3 text-muted-foreground" />
                                                    <span>{req.startDate}</span>
                                                </div>
                                                <span className="pl-4 text-muted-foreground/50 text-[10px]">to</span>
                                                <div className="flex items-center gap-1.5">
                                                    <Calendar className="h-3 w-3 text-muted-foreground" />
                                                    <span>{req.endDate}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 px-6 align-middle max-w-xs truncate text-muted-foreground" title={req.reason}>
                                            {req.reason}
                                        </td>
                                        <td className="p-4 px-6 align-middle text-center">
                                            {req.attachmentUrl ? (
                                                <a href="#" className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors" title="View Attachment">
                                                    <FileText className="h-4 w-4" />
                                                </a>
                                            ) : (
                                                <span className="text-muted-foreground text-xs">-</span>
                                            )}
                                        </td>
                                        <td className="p-4 px-6 align-middle">
                                            {req.status === 'pending' ? (
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => handleAction(req.id, 'approved')}
                                                        className="p-1.5 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors"
                                                        title="Approve"
                                                    >
                                                        <CheckCircle className="h-4 w-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleAction(req.id, 'rejected')}
                                                        className="p-1.5 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
                                                        title="Reject"
                                                    >
                                                        <Ban className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <span className={cn(
                                                    "capitalize text-sm font-medium",
                                                    req.status === 'approved' ? "text-green-600" : "text-red-600"
                                                )}>
                                                    {req.status}
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-muted-foreground">
                                        No requests found matching "{searchTerm}"
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

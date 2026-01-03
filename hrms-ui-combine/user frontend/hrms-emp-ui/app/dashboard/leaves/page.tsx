
"use client";

import { useState } from "react";
import { Badge } from "@/app/components/employees/Badge/Badge";
import { Button } from "@/app/components/employees/Button/Button";
import { Plus } from "lucide-react";

export default function LeavesPage() {
    const [requests] = useState([
        { id: 1, type: "Sick Leave", dates: "Oct 26 - Oct 27", reason: "Viral fever", status: "pending", appliedOn: "Oct 25" },
        { id: 2, type: "Casual Leave", dates: "Nov 01", reason: "Personal work", status: "approved", appliedOn: "Oct 20" },
        { id: 3, type: "Unpaid Leave", dates: "Nov 15 - Nov 20", reason: "Family trip", status: "rejected", appliedOn: "Nov 10" },
    ]);

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "approved": return <Badge status="success" text="Approved" />;
            case "rejected": return <Badge status="danger" text="Rejected" />;
            case "pending": return <Badge status="warning" text="Pending" />;
            default: return <Badge status="neutral" text={status} />;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">My Leave Requests</h2>
                    <p className="text-[var(--muted)] text-sm">Track your leave applications and status.</p>
                </div>
                <Button variant="primary" size="md">
                    <Plus className="w-4 h-4" />
                    Apply for Leave
                </Button>
            </div>

            <div className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card-bg)] overflow-hidden shadow-[var(--shadow-sm)]">
                <table className="w-full text-sm text-left">
                    <thead className="bg-[var(--muted-bg)] border-b border-[var(--border)]">
                        <tr>
                            <th className="px-6 py-3 font-medium text-[var(--muted-foreground)]">Type</th>
                            <th className="px-6 py-3 font-medium text-[var(--muted-foreground)]">Dates</th>
                            <th className="px-6 py-3 font-medium text-[var(--muted-foreground)]">Reason</th>
                            <th className="px-6 py-3 font-medium text-[var(--muted-foreground)]">Applied On</th>
                            <th className="px-6 py-3 font-medium text-[var(--muted-foreground)]">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border)]">
                        {requests.map((req) => (
                            <tr key={req.id} className="hover:bg-[var(--muted-bg)]/50 transition-colors">
                                <td className="px-6 py-4 font-medium text-[var(--foreground)]">{req.type}</td>
                                <td className="px-6 py-4 text-[var(--muted-foreground)] whitespace-nowrap">{req.dates}</td>
                                <td className="px-6 py-4 text-[var(--muted-foreground)] max-w-xs truncate">{req.reason}</td>
                                <td className="px-6 py-4 text-[var(--muted-foreground)]">{req.appliedOn}</td>
                                <td className="px-6 py-4">
                                    {getStatusBadge(req.status)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

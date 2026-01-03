
"use client";

import { Button } from "@/app/components/employees/Button/Button";
import { Download, DollarSign, CreditCard, TrendingUp } from "lucide-react";

export default function PayrollPage() {
    const salaryStructure = {
        basic: "$50,000",
        hra: "$20,000",
        allowances: "$10,000",
        professionalTax: "$2,400",
        netSalary: "$77,600"
    };

    const payslips = [
        { month: "December 2025", date: "Jan 01, 2026", amount: "$6,466", status: "Paid" },
        { month: "November 2025", date: "Dec 01, 2025", amount: "$6,466", status: "Paid" },
        { month: "October 2025", date: "Nov 01, 2025", amount: "$6,466", status: "Paid" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">My Salary</h2>
                    <p className="text-[var(--muted)] text-sm">View your salary structure and payslips.</p>
                </div>
                <Button size="md" variant="outline">
                    <Download className="w-4 h-4" />
                    Download Latest Slip
                </Button>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                {/* Salary Structure Card */}
                <div className="p-6 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card-bg)] shadow-[var(--shadow-sm)]">
                    <h3 className="text-lg font-medium mb-6 flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-[var(--primary)]" />
                        Current Salary Structure (Yearly)
                    </h3>
                    <div className="space-y-4">
                        <div className="flex justify-between py-2 border-b border-[var(--border)]">
                            <span className="text-[var(--muted-foreground)]">Basic Salary</span>
                            <span className="font-medium">{salaryStructure.basic}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-[var(--border)]">
                            <span className="text-[var(--muted-foreground)]">House Rent Allowance (HRA)</span>
                            <span className="font-medium">{salaryStructure.hra}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-[var(--border)]">
                            <span className="text-[var(--muted-foreground)]">Other Allowances</span>
                            <span className="font-medium">{salaryStructure.allowances}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-[var(--border)]">
                            <span className="text-[var(--muted-foreground)]">Professional Tax (Deduction)</span>
                            <span className="font-medium text-[var(--danger)]">-{salaryStructure.professionalTax}</span>
                        </div>
                        <div className="flex justify-between pt-4 mt-2">
                            <span className="font-bold text-lg">Total CTC</span>
                            <span className="font-bold text-lg text-[var(--success)]">{salaryStructure.netSalary}</span>
                        </div>
                    </div>
                </div>

                {/* Payslips History */}
                <div className="p-6 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card-bg)] shadow-[var(--shadow-sm)]">
                    <h3 className="text-lg font-medium mb-6 flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-[var(--muted)]" />
                        Recent Payslips
                    </h3>
                    <div className="space-y-4">
                        {payslips.map((slip, index) => (
                            <div key={index} className="flex items-center justify-between p-4 rounded-md border border-[var(--border)] hover:bg-[var(--muted-bg)] transition-colors cursor-pointer group">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 rounded-full bg-[var(--muted-bg)] group-hover:bg-[var(--background)]">
                                        <TrendingUp className="w-4 h-4 text-[var(--success)]" />
                                    </div>
                                    <div>
                                        <p className="font-medium">{slip.month}</p>
                                        <p className="text-xs text-[var(--muted)]">Paid on {slip.date}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-medium">{slip.amount}</p>
                                    <span className="text-xs text-[var(--success)] bg-[var(--success-bg)] px-2 py-0.5 rounded-full">{slip.status}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 text-center">
                        <Button variant="outline" size="sm">View All History</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}


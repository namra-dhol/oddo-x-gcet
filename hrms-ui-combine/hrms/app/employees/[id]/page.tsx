"use client";

import { use } from "react";
import { Mail, Phone, MapPin, Calendar, Clock, ArrowLeft, Pencil, Building, User, FileText, Lock, DollarSign, AlertCircle } from "lucide-react";
import Link from "next/link";
import { cn } from "@/app/lib/utils";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Mock Data
const employeeData = {
    id: 1,
    name: "Dhaval Siddhapura",
    role: "Product Designer",
    dept: "Design",
    manager: "Astonishing Whale",
    loginId: "dhaval.s",
    email: "dhaval@company.com",
    phone: "+1 (555) 012-3456",
    location: "Ahmedabad, India",
    joinDate: "Jan 12, 2023",
    status: "Present",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dhaval",
    about: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    interests: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.",
    skills: ["UI/UX Design", "Figma", "React", "Tailwind CSS"],
    salary: {
        monthly: 50000,
        yearly: 600000,
        workingDays: 5,
        breakTime: "1 hrs",
        basic: 25000,
        hra: 12500,
        standard: 4167,
        bonus: 2042.50,
        lta: 2918,
        fixed: 2918.50,
        pf_employee: 3000,
        pf_employer: 3000,
        pt: 200
    }
};

function SalaryCalculator() {
    const [wage, setWage] = useState(50000);

    // Constants & Formulas
    const basic = wage * 0.50;
    const hra = basic * 0.50;
    const standard = 4167; // Fixed
    const bonus = basic * 0.0833;
    const lta = basic * 0.0833;

    // Fixed Allowance is balancer
    // Sum of others
    const othersTotal = basic + hra + standard + bonus + lta;
    const fixedAllowance = Math.max(0, wage - othersTotal);

    // PF
    const pf = basic * 0.12;
    const pt = 200;

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Wage Input */}
                <div className="space-y-4">
                    <div className="p-4 bg-card border border-primary/20 rounded-lg shadow-sm ring-4 ring-primary/5">
                        <label className="text-sm font-medium text-primary">Monthly Wage (Input)</label>
                        <div className="flex items-center mt-2 gap-2">
                            <span className="text-2xl font-bold text-muted-foreground">₹</span>
                            <input
                                type="number"
                                value={wage}
                                onChange={(e) => setWage(Number(e.target.value))}
                                className="w-full text-3xl font-bold bg-transparent outline-none border-b border-dashed border-primary/30 focus:border-primary transition-colors"
                            />
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">Edit this value to auto-calculate components.</p>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-card border rounded-lg">
                        <span className="text-muted-foreground">Yearly Wage</span>
                        <div className="text-right">
                            <span className="text-xl font-bold">₹ {(wage * 12).toLocaleString()}</span>
                            <span className="text-xs text-muted-foreground ml-1">/ Yearly</span>
                        </div>
                    </div>
                </div>

                {/* Shifts Detail */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-card border rounded-lg">
                        <span className="text-muted-foreground">No of working days in a week:</span>
                        <span className="text-lg font-mono font-medium">5</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-card border rounded-lg">
                        <span className="text-muted-foreground">Break Time:</span>
                        <span className="text-lg font-mono font-medium">1 hr</span>
                    </div>
                </div>
            </div>

            {/* Components Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
                {/* Earnings */}
                <div className="space-y-6">
                    <h4 className="font-semibold text-muted-foreground uppercase text-xs tracking-wider border-b pb-2">Salary Components</h4>

                    <div className="space-y-4">
                        {[
                            { label: "Basic Salary", value: basic, sub: "50% of Wage", desc: "Base component of salary." },
                            { label: "House Rent Allowance (HRA)", value: hra, sub: "50% of Basic", desc: "Tax exemption benefit for rent." },
                            { label: "Standard Allowance", value: standard, sub: "Fixed", desc: "Fixed statutory deduction relief." },
                            { label: "Performance Bonus", value: bonus, sub: "8.33% of Basic", desc: "Variable pay component." },
                            { label: "Leave Travel Allowance", value: lta, sub: "8.33% of Basic", desc: "Travel expense relief." },
                            { label: "Fixed Allowance", value: fixedAllowance, sub: "Balancing", desc: "Adjusts to match total wage." },
                        ].map((item, i) => (
                            <div key={i} className="group">
                                <div className="flex justify-between items-baseline">
                                    <span className="font-medium text-sm">{item.label}</span>
                                    <div className="text-right">
                                        <span className="font-mono text-sm font-semibold">₹ {item.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                        <span className="text-xs text-muted-foreground ml-2 w-20 inline-block text-right">{item.sub}</span>
                                    </div>
                                </div>
                                <p className="text-[10px] text-muted-foreground mt-0.5">{item.desc}</p>
                                <div className="h-px bg-border/40 mt-2 group-last:hidden" />
                            </div>
                        ))}

                        <div className="flex justify-between items-center pt-2 border-t border-dashed">
                            <span className="font-bold text-sm">Gross Earnings</span>
                            <span className="font-mono font-bold text-green-700">₹ {wage.toLocaleString()}</span>
                        </div>
                    </div>
                </div>

                {/* Deductions */}
                <div className="space-y-6">
                    <h4 className="font-semibold text-muted-foreground uppercase text-xs tracking-wider border-b pb-2">Contributions & Deductions</h4>

                    <div className="space-y-4">
                        {[
                            { label: "PF (Employee)", value: pf, sub: "12% of Basic", desc: "Provident Fund contribution." },
                            { label: "PF (Employer)", value: pf, sub: "12% of Basic", desc: "Company's matching contribution." },
                        ].map((item, i) => (
                            <div key={i} className="group">
                                <div className="flex justify-between items-baseline">
                                    <span className="font-medium text-sm">{item.label}</span>
                                    <div className="text-right">
                                        <span className="font-mono text-sm">₹ {item.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                        <span className="text-xs text-muted-foreground ml-2 w-20 inline-block text-right">{item.sub}</span>
                                    </div>
                                </div>
                                <p className="text-[10px] text-muted-foreground mt-0.5">{item.desc}</p>
                                <div className="h-px bg-border/40 mt-2 group-last:hidden" />
                            </div>
                        ))}
                    </div>

                    <h4 className="font-semibold text-muted-foreground uppercase text-xs tracking-wider border-b pb-2 pt-4">Taxes</h4>
                    <div className="flex justify-between items-baseline">
                        <span className="font-medium text-sm">Professional Tax</span>
                        <div className="text-right">
                            <span className="font-mono text-sm">₹ {pt}</span>
                            <span className="text-xs text-muted-foreground ml-2 w-20 inline-block text-right">Fixed</span>
                        </div>
                    </div>

                    <div className="mt-8 p-4 bg-primary/5 rounded-lg border border-primary/10">
                        <div className="flex justify-between items-center">
                            <span className="font-bold text-lg">Net Pay (Est.)</span>
                            <span className="font-mono font-bold text-xl text-primary">₹ {(wage - pf - pt).toLocaleString()}</span>
                        </div>
                        <p className="text-xs text-muted-foreground text-right mt-1">Monthly In-Hand</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function EmployeeProfile({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const [activeTab, setActiveTab] = useState("resume");
    const isAdmin = true; // Simulating Admin View

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* Back Navigation */}
            <Link href="/employees" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Directory
            </Link>

            {/* Main Profile Card */}
            <div className="rounded-2xl border bg-card text-card-foreground shadow-sm overflow-hidden">

                {/* 1. Header Section (As per wireframe) */}
                <div className="p-8 border-b border-border/50">
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Avatar with Edit */}
                        <div className="relative group shrink-0">
                            <div className="h-32 w-32 rounded-full ring-4 ring-muted bg-muted overflow-hidden">
                                <img src={employeeData.image} alt={employeeData.name} className="w-full h-full object-cover" />
                            </div>
                        </div>

                        {/* Info Grid */}
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                            <div className="space-y-4">
                                <div>
                                    <h1 className="text-3xl font-bold tracking-tight">{employeeData.name}</h1>
                                    <p className="text-lg text-muted-foreground">{employeeData.role}</p>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between border-b border-dashed border-border/50 pb-1">
                                        <span className="text-sm text-muted-foreground font-medium">Login ID</span>
                                        <span className="text-sm font-medium">{employeeData.loginId}</span>
                                    </div>
                                    <div className="flex items-center justify-between border-b border-dashed border-border/50 pb-1">
                                        <span className="text-sm text-muted-foreground font-medium">Email</span>
                                        <span className="text-sm font-medium">{employeeData.email}</span>
                                    </div>
                                    <div className="flex items-center justify-between border-b border-dashed border-border/50 pb-1">
                                        <span className="text-sm text-muted-foreground font-medium">Mobile</span>
                                        <span className="text-sm font-medium">{employeeData.phone}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4 pt-2">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between border-b border-dashed border-border/50 pb-1">
                                        <span className="text-sm text-muted-foreground font-medium">Company</span>
                                        <span className="text-sm font-medium">Oddo Inc.</span>
                                    </div>
                                    <div className="flex items-center justify-between border-b border-dashed border-border/50 pb-1">
                                        <span className="text-sm text-muted-foreground font-medium">Department</span>
                                        <span className="text-sm font-medium">{employeeData.dept}</span>
                                    </div>
                                    <div className="flex items-center justify-between border-b border-dashed border-border/50 pb-1">
                                        <span className="text-sm text-muted-foreground font-medium">Manager</span>
                                        <span className="text-sm font-medium">{employeeData.manager}</span>
                                    </div>
                                    <div className="flex items-center justify-between border-b border-dashed border-border/50 pb-1">
                                        <span className="text-sm text-muted-foreground font-medium">Location</span>
                                        <span className="text-sm font-medium">{employeeData.location}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Tabs Navigation */}
                <div className="flex border-b border-border bg-muted/10 px-8 overflow-x-auto">
                    <button
                        onClick={() => setActiveTab("resume")}
                        className={cn(
                            "px-6 py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap",
                            activeTab === "resume" ? "border-primary text-primary bg-background" : "border-transparent text-muted-foreground hover:text-foreground"
                        )}
                    >
                        <FileText className="h-4 w-4" />
                        Resume
                    </button>
                    <button
                        onClick={() => setActiveTab("private")}
                        className={cn(
                            "px-6 py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap",
                            activeTab === "private" ? "border-primary text-primary bg-background" : "border-transparent text-muted-foreground hover:text-foreground"
                        )}
                    >
                        <Lock className="h-4 w-4" />
                        Private Info
                    </button>
                    {isAdmin && (
                        <button
                            onClick={() => setActiveTab("salary")}
                            className={cn(
                                "px-6 py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap",
                                activeTab === "salary" ? "border-primary text-primary bg-background" : "border-transparent text-muted-foreground hover:text-foreground"
                            )}
                        >
                            <DollarSign className="h-4 w-4" />
                            Salary Info
                        </button>
                    )}
                </div>

                {/* 3. Content Area */}
                <div className="p-8 min-h-[500px] bg-muted/5">
                    {activeTab === "resume" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-left-4 duration-300">
                            <div className="space-y-6">
                                <div className="rounded-xl border bg-card p-6 shadow-sm">
                                    <h3 className="font-semibold text-lg mb-4">About</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {employeeData.about}
                                    </p>
                                </div>
                                <div className="rounded-xl border bg-card p-6 shadow-sm">
                                    <h3 className="font-semibold text-lg mb-4">What I love about my job</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {employeeData.about}
                                    </p>
                                </div>
                                <div className="rounded-xl border bg-card p-6 shadow-sm">
                                    <h3 className="font-semibold text-lg mb-4">My interests and hobbies</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {employeeData.interests}
                                    </p>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div className="rounded-xl border bg-card p-6 shadow-sm">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="font-semibold text-lg">Skills</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {employeeData.skills.map(skill => (
                                            <span key={skill} className="px-3 py-1 bg-muted rounded-full text-xs font-medium border">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="rounded-xl border bg-card p-6 shadow-sm">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="font-semibold text-lg">Certification</h3>
                                    </div>
                                    <div className="text-sm text-muted-foreground py-8 text-center italic">
                                        No certifications added yet.
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "salary" && isAdmin && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">

                            {/* Important Note Box */}
                            <div className="bg-amber-50/50 border border-amber-200 rounded-xl p-6 text-amber-900/80 text-sm space-y-3 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <AlertCircle className="h-24 w-24" />
                                </div>
                                <h4 className="font-bold flex items-center gap-2 text-amber-900">
                                    <AlertCircle className="h-4 w-4" />
                                    Important: Salary Calculation (Schema Config)
                                </h4>
                                <ul className="list-disc list-inside space-y-1 ml-1 opacity-90">
                                    <li><strong>Basic Salary</strong> (50%): Base component.</li>
                                    <li><strong>HRA</strong> (50% of Basic): Rent allowance.</li>
                                    <li><strong>Professional Tax</strong>: Fixed statutory deduction.</li>
                                    <li><strong>Bonus</strong> (8.33%): Variable performance pay.</li>
                                    <li><strong>Allowances</strong> (~11.67%): Special allowances balancing component.</li>
                                </ul>
                            </div>

                            <SalaryCalculator />
                        </div>
                    )}

                    {activeTab === "private" && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div className="rounded-xl border bg-card p-6 shadow-sm">
                                <div className="flex items-center gap-3 mb-6 border-b pb-4">
                                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                        <Lock className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">Private & Restricted Info</h3>
                                        <p className="text-sm text-muted-foreground">Sensitive data visible only to Admins (Bank Details, etc.)</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Personal Details as per 'address', 'dob' schema */}
                                    <div className="space-y-4">
                                        <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Personal Details</h4>
                                        <div className="space-y-3">
                                            <div className="p-3 bg-muted/30 rounded-lg border border-border/50">
                                                <div className="text-xs text-muted-foreground mb-1">Date of Birth</div>
                                                <div className="font-medium">12 Aug, 1995</div>
                                            </div>
                                            <div className="p-3 bg-muted/30 rounded-lg border border-border/50">
                                                <div className="text-xs text-muted-foreground mb-1">Residential Address</div>
                                                <div className="font-medium">B-404, Galaxy Heights, Science City Road, Ahmedabad, GA</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bank Details as per 'bank_details' schema */}
                                    <div className="space-y-4">
                                        <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Bank Details</h4>
                                        <div className="space-y-3">
                                            <div className="p-3 bg-muted/30 rounded-lg border border-border/50 relative overflow-hidden group">
                                                <div className="text-xs text-muted-foreground mb-1">Account Number</div>
                                                <div className="font-mono font-medium tracking-widest flex items-center gap-2">
                                                    <span>•••• •••• •••• 4589</span>
                                                    <button className="text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">Show</button>
                                                </div>
                                            </div>
                                            <div className="p-3 bg-muted/30 rounded-lg border border-border/50">
                                                <div className="text-xs text-muted-foreground mb-1">IFSC Code</div>
                                                <div className="font-mono font-medium">HDFC0001234</div>
                                            </div>
                                            <div className="p-3 bg-muted/30 rounded-lg border border-border/50">
                                                <div className="text-xs text-muted-foreground mb-1">Bank Name</div>
                                                <div className="font-medium">HDFC Bank Ltd.</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}

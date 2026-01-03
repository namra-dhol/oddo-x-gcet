"use client";

import { Search, Plus, User, Plane, AlertCircle, X, Check } from "lucide-react";
import Link from "next/link";
import { cn } from "@/app/lib/utils";
import { useState } from "react";

// Mock Data
const employees = [
    { id: 1, name: "Alice Johnson", role: "Product Designer", dept: "Design", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice", status: "Present" },
    { id: 2, name: "Bob Smith", role: "Frontend Developer", dept: "Engineering", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob", status: "On Leave" },
    { id: 3, name: "Charlie Brown", role: "HR Manager", dept: "Human Resources", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie", status: "Absent" },
    { id: 4, name: "Diana Prince", role: "Marketing Lead", dept: "Marketing", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Diana", status: "Present" },
    { id: 5, name: "Evan Wright", role: "Backend Developer", dept: "Engineering", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Evan", status: "Present" },
    { id: 6, name: "Fiona Gallagher", role: "Support Specialist", dept: "Support", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fiona", status: "On Leave" },
];

function AddUserModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-card w-full max-w-lg rounded-xl shadow-xl border overflow-hidden animate-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b bg-muted/20">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                        <User className="h-5 w-5 text-primary" />
                        Add New User
                    </h3>
                    <button onClick={onClose} className="p-1 hover:bg-muted rounded-full transition-colors">
                        <X className="h-5 w-5 text-muted-foreground" />
                    </button>
                </div>

                {/* Body (Form) */}
                <div className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Username</label>
                            <input type="text" placeholder="johndoe" className="w-full px-3 py-2 bg-background border rounded-md focus:ring-1 focus:ring-primary outline-none" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Role ID</label>
                            <select className="w-full px-3 py-2 bg-background border rounded-md focus:ring-1 focus:ring-primary outline-none">
                                <option value="1">Admin (1)</option>
                                <option value="2">Employee (2)</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">User Email</label>
                        <input type="email" placeholder="john@example.com" className="w-full px-3 py-2 bg-background border rounded-md focus:ring-1 focus:ring-primary outline-none" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">User Phone</label>
                            <input type="text" placeholder="+1234567890" className="w-full px-3 py-2 bg-background border rounded-md focus:ring-1 focus:ring-primary outline-none" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Password</label>
                            <input type="password" placeholder="••••••••" className="w-full px-3 py-2 bg-background border rounded-md focus:ring-1 focus:ring-primary outline-none" />
                        </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                        <input type="checkbox" id="temp" className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" defaultChecked />
                        <label htmlFor="temp" className="text-sm font-medium cursor-pointer text-muted-foreground">
                            Is Temporary User
                        </label>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t bg-muted/20 flex justify-end gap-2">
                    <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted rounded-md transition-colors">
                        Cancel
                    </button>
                    <button className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:bg-primary/90 transition-colors flex items-center gap-2">
                        <Check className="h-4 w-4" />
                        Create User
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function EmployeesPage() {
    const [isAddUserOpen, setIsAddUserOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredEmployees = employees.filter(employee =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6 animate-in fade-in duration-500">

            {/* Header / Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <h2 className="text-3xl font-bold tracking-tight self-start">Employees</h2>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search by name or role..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 rounded-lg border bg-background focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        />
                    </div>
                    <button
                        onClick={() => setIsAddUserOpen(true)}
                        className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-md"
                    >
                        <Plus className="h-5 w-5" />
                        NEW
                    </button>
                </div>
            </div>

            {/* Employee Grid */}
            {filteredEmployees.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredEmployees.map((employee) => (
                        <Link
                            key={employee.id}
                            href={`/employees/${employee.id}`}
                            className="group relative flex flex-col items-center bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                        >
                            {/* Status Indicator (Top Right) */}
                            <div className="absolute top-4 right-4">
                                {employee.status === "Present" && (
                                    <div className="h-4 w-4 rounded-full bg-green-500 border-2 border-card ring-1 ring-green-500/30" title="Present"></div>
                                )}
                                {employee.status === "On Leave" && (
                                    <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 border-2 border-card" title="On Leave">
                                        <Plane className="h-3 w-3 fill-current" />
                                    </div>
                                )}
                                {employee.status === "Absent" && (
                                    <div className="h-4 w-4 rounded-full bg-yellow-400 border-2 border-card ring-1 ring-yellow-400/30" title="Absent"></div>
                                )}
                            </div>

                            {/* Avatar */}
                            <div className="w-24 h-24 rounded-full bg-muted mb-4 overflow-hidden border-2 border-border group-hover:border-primary/50 transition-colors">
                                <img src={employee.image} alt={employee.name} className="w-full h-full object-cover" />
                            </div>

                            {/* Info */}
                            <h3 className="text-lg font-bold text-foreground text-center">{employee.name}</h3>
                            <p className="text-sm text-primary font-medium text-center">{employee.role}</p>
                            <p className="text-xs text-muted-foreground mt-1 text-center bg-muted/50 px-2 py-1 rounded-full">{employee.dept}</p>

                            {/* Hover visual cue */}
                            <div className="absolute inset-x-0 bottom-0 h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-xl" />
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 text-muted-foreground">
                    <p>No employees found matching "{searchTerm}"</p>
                </div>
            )}

            {/* Modals */}
            <AddUserModal isOpen={isAddUserOpen} onClose={() => setIsAddUserOpen(false)} />
        </div>
    );
}

"use client";

import { Button } from "@/app/components/employees/Button/Button";
import { Badge } from "@/app/components/employees/Badge/Badge";
import { User, Mail, Phone, MapPin, Briefcase, Calendar } from "lucide-react";

export default function ProfilePage() {
    const employee = {
        name: "John Doe",
        role: "Software Engineer",
        email: "john.doe@dayflow.com",
        phone: "+1 (555) 123-4567",
        address: "123 Tech Park, Silicon Valley, CA",
        dob: "Jan 15, 1995",
        joinDate: "Mar 01, 2023",
        status: "active",
        skills: ["React", "TypeScript", "Node.js", "SQL"],
        bio: "Passionate full-stack developer with 5+ years of experience in building scalable web applications. Loves coffee and clean code."
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="relative mb-16">
                {/* Cover Image */}
                <div className="h-48 w-full bg-gradient-to-r from-[var(--primary)] to-[var(--muted-foreground)] rounded-t-[var(--radius)]"></div>

                {/* Profile Header */}
                <div className="absolute -bottom-12 left-8 flex items-end gap-6">
                    <div className="w-32 h-32 rounded-full border-4 border-[var(--background)] bg-[var(--muted-bg)] flex items-center justify-center text-4xl font-bold text-[var(--muted-foreground)]">
                        JD
                    </div>
                    <div className="mb-2">
                        <h1 className="text-3xl font-bold text-[var(--foreground)]">{employee.name}</h1>
                        <p className="text-[var(--muted-foreground)] text-lg">{employee.role}</p>
                    </div>
                </div>
                <div className="absolute bottom-4 right-8">
                    <Button variant="outline" size="sm">Edit Profile</Button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3 pt-6">
                {/* Left Column: Personal Info */}
                <div className="md:col-span-1 space-y-6">
                    <div className="p-6 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card-bg)] shadow-[var(--shadow-sm)]">
                        <h3 className="text-lg font-medium mb-4">Personal Details</h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-sm">
                                <Mail className="w-4 h-4 text-[var(--muted)]" />
                                <span>{employee.email}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <Phone className="w-4 h-4 text-[var(--muted)]" />
                                <span>{employee.phone}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <MapPin className="w-4 h-4 text-[var(--muted)]" />
                                <span>{employee.address}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <Calendar className="w-4 h-4 text-[var(--muted)]" />
                                <span>Born {employee.dob}</span>
                            </div>
                            <div className="pt-2">
                                <Badge status="success" text="Active Employee" />
                            </div>
                        </div>
                    </div>

                    <div className="p-6 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card-bg)] shadow-[var(--shadow-sm)]">
                        <h3 className="text-lg font-medium mb-4">Department Info</h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-sm">
                                <Briefcase className="w-4 h-4 text-[var(--muted)]" />
                                <div>
                                    <p className="font-medium">Engineering</p>
                                    <p className="text-xs text-[var(--muted)]">Department</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <Calendar className="w-4 h-4 text-[var(--muted)]" />
                                <div>
                                    <p className="font-medium">{employee.joinDate}</p>
                                    <p className="text-xs text-[var(--muted)]">Joined Date</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Bio & Skills */}
                <div className="md:col-span-2 space-y-6">
                    <div className="p-6 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card-bg)] shadow-[var(--shadow-sm)]">
                        <h3 className="text-lg font-medium mb-4">About</h3>
                        <p className="text-[var(--muted-foreground)] leading-relaxed">
                            {employee.bio}
                        </p>
                    </div>

                    <div className="p-6 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card-bg)] shadow-[var(--shadow-sm)]">
                        <h3 className="text-lg font-medium mb-4">Skills</h3>
                        <div className="flex flex-wrap gap-2">
                            {employee.skills.map(skill => (
                                <span key={skill} className="px-3 py-1 bg-[var(--muted-bg)] border border-[var(--border)] rounded-full text-sm font-medium">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="p-6 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card-bg)] shadow-[var(--shadow-sm)]">
                        <h3 className="text-lg font-medium mb-4">Documents</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {['Resume.pdf', 'Offer_Letter.pdf', 'ID_Proof.jpg'].map(doc => (
                                <div key={doc} className="flex items-center p-3 border border-[var(--border)] rounded-md hover:bg-[var(--muted-bg)] cursor-pointer transition-colors">
                                    <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center text-red-600 mr-3 font-bold text-xs">PDF</div>
                                    <span className="text-sm font-medium truncate">{doc}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

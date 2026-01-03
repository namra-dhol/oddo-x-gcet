"use client";

import React from 'react';
import { Card } from '@/app/components/employees/Card/Card';
import { Badge } from '@/app/components/employees/Badge/Badge';
import { Button } from '@/app/components/employees/Button/Button';
import { Tabs } from '@/app/components/employees/Tabs/Tabs';

export default function EmployeeProfilePage() {

    // Tab 1: Overview
    const OverviewContent = () => (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="transform hover:scale-[1.02] transition-transform duration-300">
                <Card title="About Me">
                    <p className="leading-relaxed text-purple-200">
                        Senior UI/UX Designer with 5+ years of experience in creating user-centered digital products.
                        Passionate about building clean, accessible, and responsive interfaces.
                    </p>
                </Card>
            </div>

            <div className="transform hover:scale-[1.02] transition-transform duration-300">
                <Card title="Personal Details">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between py-3 px-4 bg-white bg-opacity-5 rounded-xl hover:bg-opacity-10 transition-all duration-300 group">
                            <span className="text-purple-300 text-sm font-medium flex items-center gap-2">
                                <span className="text-lg">📧</span>
                                Email
                            </span>
                            <span className="text-white font-semibold group-hover:text-purple-300 transition-colors">
                                alex.morgan@dayflow.com
                            </span>
                        </div>
                        <div className="flex items-center justify-between py-3 px-4 bg-white bg-opacity-5 rounded-xl hover:bg-opacity-10 transition-all duration-300 group">
                            <span className="text-purple-300 text-sm font-medium flex items-center gap-2">
                                <span className="text-lg">📱</span>
                                Phone
                            </span>
                            <span className="text-white font-semibold group-hover:text-purple-300 transition-colors">
                                +1 (555) 123-4567
                            </span>
                        </div>
                        <div className="flex items-center justify-between py-3 px-4 bg-white bg-opacity-5 rounded-xl hover:bg-opacity-10 transition-all duration-300 group">
                            <span className="text-purple-300 text-sm font-medium flex items-center gap-2">
                                <span className="text-lg">📍</span>
                                Location
                            </span>
                            <span className="text-white font-semibold group-hover:text-purple-300 transition-colors">
                                New York, USA
                            </span>
                        </div>
                        <div className="flex items-center justify-between py-3 px-4 bg-white bg-opacity-5 rounded-xl hover:bg-opacity-10 transition-all duration-300 group">
                            <span className="text-purple-300 text-sm font-medium flex items-center gap-2">
                                <span className="text-lg">📅</span>
                                Joined
                            </span>
                            <span className="text-white font-semibold group-hover:text-purple-300 transition-colors">
                                Mar 12, 2021
                            </span>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );

    // Tab 2: Skills & Certifications
    const SkillsContent = () => (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="transform hover:scale-[1.02] transition-transform duration-300">
                <Card title="Technical Skills">
                    <div className="flex flex-wrap gap-3">
                        {['React', 'Next.js', 'Typescript', 'Figma', 'Node.js', 'Tailwind CSS'].map((skill, index) => (
                            <span
                                key={skill}
                                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 bg-opacity-20 text-white rounded-xl font-medium text-sm border border-purple-400 border-opacity-30 hover:border-opacity-60 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-default"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </Card>
            </div>

            <div className="transform hover:scale-[1.02] transition-transform duration-300">
                <Card title="Certifications">
                    <div className="space-y-4">
                        <div className="flex items-start gap-4 p-4 bg-white bg-opacity-5 rounded-xl hover:bg-opacity-10 transition-all duration-300 group border border-white border-opacity-10">
                            <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                                🏆
                            </div>
                            <div className="flex-1">
                                <div className="font-semibold text-white mb-1 group-hover:text-purple-300 transition-colors">
                                    Google UX Design Professional
                                </div>
                                <div className="text-sm text-purple-300 flex items-center gap-2">
                                    <span>📅</span>
                                    Issued Jan 2023
                                </div>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 bg-white bg-opacity-5 rounded-xl hover:bg-opacity-10 transition-all duration-300 group border border-white border-opacity-10">
                            <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                                📜
                            </div>
                            <div className="flex-1">
                                <div className="font-semibold text-white mb-1 group-hover:text-purple-300 transition-colors">
                                    AWS Certified Cloud Practitioner
                                </div>
                                <div className="text-sm text-purple-300 flex items-center gap-2">
                                    <span>📅</span>
                                    Issued Aug 2022
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );

    // Tab 3: Private Info (Restricted)
    const PrivateInfoContent = () => (
        <div className="transform hover:scale-[1.01] transition-transform duration-300">
            <Card title="Private Information" subtitle="Visible only to you and admins">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 bg-purple-500 bg-opacity-20 rounded-xl flex items-center justify-center">
                                <span className="text-2xl">🆔</span>
                            </div>
                            <h4 className="text-lg font-bold text-white uppercase tracking-wide">Identity</h4>
                        </div>

                        <div className="flex items-center justify-between py-3 px-4 bg-white bg-opacity-5 rounded-xl hover:bg-opacity-10 transition-all duration-300">
                            <span className="text-purple-300 text-sm font-medium">Date of Birth</span>
                            <span className="text-white font-semibold">Oct 24, 1992</span>
                        </div>
                        <div className="flex items-center justify-between py-3 px-4 bg-white bg-opacity-5 rounded-xl hover:bg-opacity-10 transition-all duration-300">
                            <span className="text-purple-300 text-sm font-medium">Government ID</span>
                            <span className="text-white font-semibold font-mono">A123-4567-8901</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 bg-green-500 bg-opacity-20 rounded-xl flex items-center justify-center">
                                <span className="text-2xl">🏦</span>
                            </div>
                            <h4 className="text-lg font-bold text-white uppercase tracking-wide">Bank Details</h4>
                        </div>

                        <div className="flex items-center justify-between py-3 px-4 bg-white bg-opacity-5 rounded-xl hover:bg-opacity-10 transition-all duration-300">
                            <span className="text-purple-300 text-sm font-medium">Bank Name</span>
                            <span className="text-white font-semibold">Chase Bank</span>
                        </div>
                        <div className="flex items-center justify-between py-3 px-4 bg-white bg-opacity-5 rounded-xl hover:bg-opacity-10 transition-all duration-300">
                            <span className="text-purple-300 text-sm font-medium">Account Number</span>
                            <span className="text-white font-semibold font-mono">•••• •••• 1234</span>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );

    return (
        <div className="space-y-6 sm:space-y-8 animate-fadeIn p-4 sm:p-6 lg:p-8">
            {/* Profile Header with Glass Effect and Gradient Background */}
            <div className="relative bg-white bg-opacity-10 backdrop-blur-2xl rounded-3xl border border-white border-opacity-20 shadow-2xl overflow-hidden p-6 sm:p-8">
                {/* Decorative Background */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-3xl opacity-20 -z-10"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-blue-500 to-cyan-500 rounded-full blur-3xl opacity-20 -z-10"></div>

                <div className="relative flex flex-col md:flex-row items-center md:items-start gap-6">
                    {/* Avatar with Ring Animation */}
                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                        <img
                            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
                            alt="Profile"
                            className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white border-opacity-30 shadow-2xl group-hover:scale-110 transition-transform duration-300 object-cover"
                        />
                        <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-slate-900 shadow-lg"></div>
                    </div>

                    {/* Profile Info */}
                    <div className="flex-1 text-center md:text-left space-y-3 w-full">
                        <div className="flex flex-col md:flex-row md:items-center gap-2 sm:gap-3 justify-center md:justify-start">
                            <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
                                Alex Morgan
                            </h1>
                            <div className="transform hover:scale-110 transition-transform duration-300 inline-block">
                                <Badge status="success" text="Active" />
                            </div>
                        </div>

                        <p className="text-xl text-purple-300 font-medium flex items-center justify-center md:justify-start gap-2">
                            <span>💼</span>
                            Senior Product Designer
                        </p>

                        <div className="flex flex-wrap gap-3 justify-center md:justify-start pt-2">
                            <div className="px-4 py-2 bg-white bg-opacity-10 rounded-xl text-sm text-purple-200 flex items-center gap-2">
                                <span>🌟</span>
                                <span>5+ Years Experience</span>
                            </div>
                            <div className="px-4 py-2 bg-white bg-opacity-10 rounded-xl text-sm text-purple-200 flex items-center gap-2">
                                <span>📍</span>
                                <span>New York, USA</span>
                            </div>
                        </div>

                        <div className="pt-4">
                            <Button variant="outline" size="sm">Edit Profile</Button>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="flex flex-row md:flex-col gap-3 w-full md:w-auto justify-center md:justify-start mt-4 md:mt-0">
                        <div className="flex-1 md:flex-none bg-gradient-to-br from-purple-500 to-blue-500 bg-opacity-20 backdrop-blur-sm rounded-2xl p-3 sm:p-4 border border-white border-opacity-20 hover:scale-105 transition-transform duration-300 text-center md:text-left min-w-[100px]">
                            <div className="text-2xl sm:text-3xl font-bold text-white">24</div>
                            <div className="text-xs sm:text-sm text-purple-300">Projects</div>
                        </div>
                        <div className="flex-1 md:flex-none bg-gradient-to-br from-green-500 to-emerald-500 bg-opacity-20 backdrop-blur-sm rounded-2xl p-3 sm:p-4 border border-white border-opacity-20 hover:scale-105 transition-transform duration-300 text-center md:text-left min-w-[100px]">
                            <div className="text-2xl sm:text-3xl font-bold text-white">98%</div>
                            <div className="text-xs sm:text-sm text-purple-300">Rating</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs Section */}
            <Tabs
                items={[
                    { id: 'overview', label: 'Overview', content: <OverviewContent /> },
                    { id: 'skills', label: 'Skills & Certifications', content: <SkillsContent /> },
                    { id: 'private', label: 'Private Info', content: <PrivateInfoContent /> },
                    { id: 'security', label: 'Security', content: <Card title="Security Settings"><p className="text-purple-200">Two-factor authentication is enabled.</p></Card> },
                ]}
            />

            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.6s ease-out;
                }
            `}</style>
        </div>
    );
}
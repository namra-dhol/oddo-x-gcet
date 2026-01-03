"use client";

import React, { useState } from 'react';
import { StatsCard } from '@/app/components/employees/StatsCard/StatsCard';
import { Badge } from '@/app/components/employees/Badge/Badge';

export default function AttendancePage() {
    const [month, setMonth] = useState('January 2026');

    // Dummy Data
    const attendanceData = [
        { date: 'Jan 01, 2026', checkIn: '09:00 AM', checkOut: '06:00 PM', total: '9h 00m', status: 'Present' },
        { date: 'Jan 02, 2026', checkIn: '09:15 AM', checkOut: '06:10 PM', total: '8h 55m', status: 'Present' },
        { date: 'Jan 03, 2026', checkIn: '-', checkOut: '-', total: '-', status: 'Absent' },
        { date: 'Jan 04, 2026', checkIn: '09:00 AM', checkOut: '01:00 PM', total: '4h 00m', status: 'Half Day' },
        { date: 'Jan 05, 2026', checkIn: '08:55 AM', checkOut: '06:05 PM', total: '9h 10m', status: 'Present' },
    ];

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'Present': return <Badge status="success" text="Present" />;
            case 'Absent': return <Badge status="danger" text="Absent" />;
            case 'Half Day': return <Badge status="warning" text="Half Day" />;
            default: return <Badge status="neutral" text={status} />;
        }
    };

    return (
        <div className="space-y-6 sm:space-y-8 animate-fadeIn p-4 sm:p-6 lg:p-8">
            {/* Header Section with Gradient */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-white border-opacity-10">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 tracking-tight">
                        My Attendance
                    </h1>
                    <p className="text-purple-300 text-sm">Track your attendance and work hours</p>
                </div>

                <div className="w-full sm:w-auto">
                    <select
                        className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20 text-white font-medium shadow-lg hover:bg-opacity-20 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50 appearance-none bg-no-repeat bg-[right_1rem_center]"
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                    >
                        <option className="bg-slate-800 text-white">January 2026</option>
                        <option className="bg-slate-800 text-white">December 2025</option>
                        <option className="bg-slate-800 text-white">November 2025</option>
                    </select>
                </div>
            </div>

            {/* Stats Grid with Glass Effect */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="transform hover:scale-105 transition-transform duration-300">
                    <StatsCard
                        label="Total Working Days"
                        value="24"
                        icon={<span className="text-3xl">📅</span>}
                    />
                </div>
                <div className="transform hover:scale-105 transition-transform duration-300">
                    <StatsCard
                        label="Present Days"
                        value="20"
                        icon={<span className="text-3xl">✅</span>}
                    />
                </div>
                <div className="transform hover:scale-105 transition-transform duration-300">
                    <StatsCard
                        label="Leave / Absent"
                        value="4"
                        icon={<span className="text-3xl">❌</span>}
                    />
                </div>
            </div>

            {/* Table Container with Glass Morphism */}
            <div className="bg-white bg-opacity-10 backdrop-blur-xl rounded-2xl border border-white border-opacity-20 shadow-2xl overflow-hidden">
                {/* Filter Controls */}
                <div className="px-6 py-4 border-b border-white border-opacity-10 flex justify-end items-center bg-gradient-to-r from-purple-900 from-opacity-20 to-transparent">
                    <span className="text-sm text-purple-200 font-medium">
                        Showing records for {month}
                    </span>
                </div>

                {/* Table with Horizontal Scroll */}
                <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full min-w-[600px]">
                        <thead>
                            <tr className="bg-white bg-opacity-5">
                                <th className="px-6 py-4 text-left text-xs font-bold text-purple-300 uppercase tracking-wider whitespace-nowrap">
                                    Date
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-purple-300 uppercase tracking-wider whitespace-nowrap">
                                    Check In
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-purple-300 uppercase tracking-wider whitespace-nowrap">
                                    Check Out
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-purple-300 uppercase tracking-wider whitespace-nowrap">
                                    Total Hours
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-purple-300 uppercase tracking-wider whitespace-nowrap">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white divide-opacity-10">
                            {attendanceData.map((row, index) => (
                                <tr
                                    key={index}
                                    className="hover:bg-white hover:bg-opacity-5 transition-colors duration-200 group"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                                        {row.date}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-200">
                                        {row.checkIn}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-200">
                                        {row.checkOut}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-white">
                                        {row.total}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        {getStatusBadge(row.status)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Table Footer with Stats */}
                <div className="px-6 py-4 bg-white bg-opacity-5 border-t border-white border-opacity-10">
                    <div className="flex flex-wrap gap-4 text-xs text-purple-200">
                        <span className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                            Present: 3 days
                        </span>
                        <span className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                            Absent: 1 day
                        </span>
                        <span className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                            Half Day: 1 day
                        </span>
                    </div>
                </div>
            </div>

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
                .custom-scrollbar::-webkit-scrollbar {
                    height: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.2);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.3);
                }
            `}</style>
        </div>
    );
}
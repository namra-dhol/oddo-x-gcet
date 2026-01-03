"use client";


import { Button } from '@/app/components/employees/Button/Button';
import { Badge } from '@/app/components/employees/Badge/Badge';

export default function PayrollPage() {
    return (
        <div className="space-y-4 sm:space-y-6 md:space-y-8 animate-slideUp p-3 sm:p-6 lg:p-8">
            {/* Page Header with Glass Effect */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-white border-opacity-10">
                <div>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">
                        Payroll & Salary
                    </h1>
                    <p className="text-purple-300 text-sm">View your earnings and deductions</p>
                </div>
                <div className="w-full sm:w-auto">
                    <Button variant="outline" className="w-full sm:w-auto justify-center">View Salary History</Button>
                </div>
            </div>

            {/* Salary Card with Premium Glass Effect */}
            <div className="relative bg-white bg-opacity-10 backdrop-blur-2xl rounded-2xl sm:rounded-3xl border border-white border-opacity-20 shadow-2xl overflow-hidden">
                {/* Decorative Gradient Background */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-3xl opacity-20 -z-10"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-500 to-cyan-500 rounded-full blur-3xl opacity-20 -z-10"></div>

                {/* Salary Header */}
                <div className="relative p-4 sm:p-6 md:p-8 border-b border-white border-opacity-10 bg-gradient-to-r from-purple-900 from-opacity-30 to-transparent">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="space-y-1 sm:space-y-2">
                            <div className="text-xl sm:text-2xl font-bold text-white">
                                Payslip - December 2025
                            </div>
                            <div className="flex flex-wrap items-center gap-3">
                                <span className="text-xs sm:text-sm text-purple-300 font-mono bg-white bg-opacity-10 px-2 py-1 sm:px-3 rounded-lg">
                                    ID: PAY-2025-12-001
                                </span>
                                <span className="text-xs text-purple-400">
                                    Processed on Dec 31, 2025
                                </span>
                            </div>
                        </div>
                        <div className="transform hover:scale-110 transition-transform duration-300 self-start sm:self-center">
                            <Badge text="PAID" status="success" />
                        </div>
                    </div>
                </div>

                {/* Salary Body */}
                <div className="relative p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8">
                    {/* Earnings Section */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-green-500 bg-opacity-20 rounded-xl flex items-center justify-center">
                                <span className="text-2xl">💰</span>
                            </div>
                            <h3 className="text-xl font-bold text-white uppercase tracking-wide">
                                Earnings
                            </h3>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between py-3 px-4 bg-white bg-opacity-5 rounded-xl hover:bg-opacity-10 transition-all duration-300 group">
                                <span className="text-purple-200 font-medium group-hover:text-white transition-colors">
                                    Basic Salary
                                </span>
                                <span className="text-white font-bold text-lg">
                                    $5,000.00
                                </span>
                            </div>

                            <div className="flex items-center justify-between py-3 px-4 bg-white bg-opacity-5 rounded-xl hover:bg-opacity-10 transition-all duration-300 group">
                                <span className="text-purple-200 font-medium group-hover:text-white transition-colors">
                                    House Rent Allowance (HRA)
                                </span>
                                <span className="text-white font-bold text-lg">
                                    $2,000.00
                                </span>
                            </div>

                            <div className="flex items-center justify-between py-3 px-4 bg-white bg-opacity-5 rounded-xl hover:bg-opacity-10 transition-all duration-300 group">
                                <span className="text-purple-200 font-medium group-hover:text-white transition-colors">
                                    Special Allowance
                                </span>
                                <span className="text-white font-bold text-lg">
                                    $1,000.00
                                </span>
                            </div>

                            <div className="flex items-center justify-between py-3 px-4 bg-white bg-opacity-5 rounded-xl hover:bg-opacity-10 transition-all duration-300 group">
                                <span className="text-purple-200 font-medium group-hover:text-white transition-colors">
                                    Performance Bonus
                                </span>
                                <span className="text-green-400 font-bold text-lg flex items-center gap-2">
                                    <span className="text-sm">✨</span>
                                    $500.00
                                </span>
                            </div>
                        </div>

                        {/* Earnings Subtotal */}
                        <div className="flex items-center justify-between py-3 px-4 bg-green-500 bg-opacity-10 border border-green-500 border-opacity-30 rounded-xl mt-4">
                            <span className="text-green-300 font-semibold">
                                Total Earnings
                            </span>
                            <span className="text-green-400 font-bold text-xl">
                                $8,500.00
                            </span>
                        </div>
                    </div>

                    {/* Deductions Section */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-red-500 bg-opacity-20 rounded-xl flex items-center justify-center">
                                <span className="text-2xl">📉</span>
                            </div>
                            <h3 className="text-xl font-bold text-white uppercase tracking-wide">
                                Deductions
                            </h3>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between py-3 px-4 bg-white bg-opacity-5 rounded-xl hover:bg-opacity-10 transition-all duration-300 group">
                                <span className="text-purple-200 font-medium group-hover:text-white transition-colors">
                                    Tax Deducted at Source (TDS)
                                </span>
                                <span className="text-red-400 font-bold text-lg">
                                    -$800.00
                                </span>
                            </div>

                            <div className="flex items-center justify-between py-3 px-4 bg-white bg-opacity-5 rounded-xl hover:bg-opacity-10 transition-all duration-300 group">
                                <span className="text-purple-200 font-medium group-hover:text-white transition-colors">
                                    Provident Fund
                                </span>
                                <span className="text-red-400 font-bold text-lg">
                                    -$300.00
                                </span>
                            </div>
                        </div>

                        {/* Deductions Subtotal */}
                        <div className="flex items-center justify-between py-3 px-4 bg-red-500 bg-opacity-10 border border-red-500 border-opacity-30 rounded-xl mt-4">
                            <span className="text-red-300 font-semibold">
                                Total Deductions
                            </span>
                            <span className="text-red-400 font-bold text-xl">
                                -$1,100.00
                            </span>
                        </div>
                    </div>
                </div>

                {/* Net Salary - Highlighted Section */}
                <div className="relative px-4 py-4 sm:px-6 sm:py-6 md:px-8 bg-gradient-to-r from-purple-600 to-blue-600 border-t-2 border-purple-400 border-opacity-50">
                    {/* Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-10 animate-shimmer"></div>

                    <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="space-y-1">
                            <span className="text-purple-200 text-sm font-medium uppercase tracking-wider">
                                Net Salary Paid
                            </span>
                            <div className="flex items-center gap-2 text-xs text-purple-300">
                                <span>✓</span>
                                <span>Credited to your account</span>
                            </div>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
                                $7,400
                            </span>
                            <span className="text-2xl text-purple-200">
                                .00
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Download Button */}
            <div className="flex justify-center pt-4">
                <Button
                    variant="primary"
                    icon={<span>⬇️</span>}
                >
                    Download Payslip PDF
                </Button>
            </div>

            {/* Additional Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 pt-2 sm:pt-4">
                <div className="bg-white bg-opacity-10 backdrop-blur-xl rounded-2xl border border-white border-opacity-20 p-6 hover:bg-opacity-15 transition-all duration-300">
                    <div className="text-3xl mb-3">📊</div>
                    <div className="text-sm text-purple-300 mb-1">YTD Earnings</div>
                    <div className="text-2xl font-bold text-white">$88,800.00</div>
                </div>

                <div className="bg-white bg-opacity-10 backdrop-blur-xl rounded-2xl border border-white border-opacity-20 p-6 hover:bg-opacity-15 transition-all duration-300">
                    <div className="text-3xl mb-3">💳</div>
                    <div className="text-sm text-purple-300 mb-1">Payment Method</div>
                    <div className="text-lg font-semibold text-white">Bank Transfer</div>
                </div>

                <div className="bg-white bg-opacity-10 backdrop-blur-xl rounded-2xl border border-white border-opacity-20 p-6 hover:bg-opacity-15 transition-all duration-300">
                    <div className="text-3xl mb-3">📅</div>
                    <div className="text-sm text-purple-300 mb-1">Next Payroll</div>
                    <div className="text-lg font-semibold text-white">Jan 31, 2026</div>
                </div>
            </div>

            <style jsx>{`
                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                @keyframes shimmer {
                    0% {
                        transform: translateX(-100%);
                    }
                    100% {
                        transform: translateX(100%);
                    }
                }
                .animate-slideUp {
                    animation: slideUp 0.6s ease-out;
                }
                .animate-shimmer {
                    animation: shimmer 3s infinite;
                }
            `}</style>
        </div>
    );
}
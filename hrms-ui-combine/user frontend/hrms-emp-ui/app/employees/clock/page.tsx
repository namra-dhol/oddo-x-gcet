"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ClockPage() {
    const [time, setTime] = useState<Date | null>(null);
    const [isCheckedIn, setIsCheckedIn] = useState(false);
    const [workedSeconds, setWorkedSeconds] = useState(0);

    // Update current time every second
    useEffect(() => {
        setTime(new Date());
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    // Timer logic for worked hours
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isCheckedIn) {
            interval = setInterval(() => {
                setWorkedSeconds((prev) => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isCheckedIn]);

    const handleToggle = () => {
        setIsCheckedIn(!isCheckedIn);
    };

    const formatTime = (totalSeconds: number) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return `${hours}h ${minutes}m ${seconds}s`;
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (!time) return null; // Prevent hydration mismatch

    return (
        <div className="min-h-full flex flex-col items-center justify-center px-4 py-8 sm:py-12 relative overflow-hidden">
            {/* Animated Background Orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center space-y-8 sm:space-y-12 max-w-2xl w-full">
                {/* Clock Circle with Glass Effect */}
                <motion.div
                    className="relative"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, type: "spring" }}
                >
                    {/* Rotating Ring */}
                    <div className="absolute inset-0 -m-2 sm:-m-4">
                        <div className="w-full h-full border-4 border-purple-400 border-opacity-30 rounded-full animate-spin-slow"></div>
                    </div>

                    {/* Pulsing Glow */}
                    <div className="absolute inset-0 bg-purple-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>

                    {/* Clock Face */}
                    <div className="relative w-64 h-64 sm:w-80 sm:h-80 bg-white bg-opacity-10 backdrop-blur-2xl rounded-full border-2 border-white border-opacity-30 shadow-2xl flex flex-col items-center justify-center p-6 sm:p-8">
                        {/* Time Display */}
                        <div className="text-5xl sm:text-7xl font-bold text-white mb-2 sm:mb-3 tracking-tight font-mono tabular-nums">
                            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>

                        {/* Seconds Display */}
                        <div className="text-2xl sm:text-3xl font-semibold text-purple-300 mb-3 sm:mb-4 font-mono">
                            {time.getSeconds().toString().padStart(2, '0')}
                        </div>

                        {/* Date Display */}
                        <div className="text-sm font-medium text-purple-200 text-center leading-relaxed">
                            {formatDate(time)}
                        </div>

                        {/* Decorative Dots */}
                        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-purple-400 rounded-full"></div>
                        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-purple-400 rounded-full"></div>
                        <div className="absolute left-8 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-purple-400 rounded-full"></div>
                        <div className="absolute right-8 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-purple-400 rounded-full"></div>
                    </div>
                </motion.div>

                {/* Action Button */}
                <motion.button
                    className={`relative px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-300 shadow-2xl backdrop-blur-sm overflow-hidden group ${isCheckedIn
                        ? 'bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white'
                        : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white'
                        }`}
                    onClick={handleToggle}
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.05 }}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.3 }}
                >
                    {/* Button Glow Effect */}
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isCheckedIn ? 'bg-red-400' : 'bg-green-400'
                        } blur-xl`}></div>

                    {/* Button Content */}
                    <span className="relative flex items-center gap-3">
                        <span className="text-3xl">{isCheckedIn ? '⏹' : '▶'}</span>
                        <span>{isCheckedIn ? 'Clock Out' : 'Clock In'}</span>
                    </span>

                    {/* Animated Border */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-white opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                </motion.button>

                {/* Status Display */}
                <motion.div
                    className="text-center space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    {isCheckedIn ? (
                        <div className="space-y-4">
                            <div className="text-xl text-purple-200 font-medium flex items-center justify-center gap-2">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                </span>
                                You are currently working
                            </div>

                            {/* Timer Display with Glass Effect */}
                            <div className="inline-block px-8 py-4 bg-white bg-opacity-10 backdrop-blur-xl rounded-2xl border border-white border-opacity-20 shadow-xl">
                                <div className="text-4xl font-bold text-white font-mono tabular-nums tracking-wide">
                                    {formatTime(workedSeconds)}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            <div className="text-2xl text-white font-semibold">
                                Good morning! Ready to start?
                            </div>
                            {workedSeconds > 0 && (
                                <div className="inline-block px-6 py-3 bg-white bg-opacity-10 backdrop-blur-xl rounded-xl border border-white border-opacity-20">
                                    <div className="text-sm text-purple-300 mb-1">Total today</div>
                                    <div className="text-2xl font-bold text-white font-mono">
                                        {formatTime(workedSeconds)}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </motion.div>
            </div>

            <style jsx>{`
                @keyframes blob {
                    0%, 100% {
                        transform: translate(0, 0) scale(1);
                    }
                    33% {
                        transform: translate(30px, -50px) scale(1.1);
                    }
                    66% {
                        transform: translate(-20px, 20px) scale(0.9);
                    }
                }
                @keyframes spin-slow {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
                .animate-spin-slow {
                    animation: spin-slow 20s linear infinite;
                }
            `}</style>
        </div>
    );
}
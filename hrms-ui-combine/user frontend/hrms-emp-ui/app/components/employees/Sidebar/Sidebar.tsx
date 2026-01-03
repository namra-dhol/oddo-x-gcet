"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Calendar, DollarSign, Clock, LayoutDashboard, LogOut } from 'lucide-react';
import styles from './Sidebar.module.css';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
    const pathname = usePathname();

    const links = [
        { href: '/employees/profile', label: 'My Profile', icon: <User size={20} /> },
        { href: '/employees/attendance', label: 'Attendance', icon: <Calendar size={20} /> },
        { href: '/employees/payroll', label: 'Payroll', icon: <DollarSign size={20} /> },
        { href: '/employees/clock', label: 'Time Clock', icon: <Clock size={20} /> },
    ];

    const sidebarContent = (
        <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
            <div className={styles.logoContainer}>
                <Link href="/employees/profile" className={styles.logo}>
                    Dayflow HRMS
                </Link>
            </div>

            <nav className={styles.nav}>
                {links.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={`${styles.navItem} ${pathname === link.href ? styles.active : ''}`}
                        onClick={() => window.innerWidth < 1200 && onClose()}
                    >
                        {link.icon}
                        {link.label}
                    </Link>
                ))}

                <div style={{ marginTop: 'auto' }}>
                    <button className={styles.navItem} style={{ width: '100%', border: 'none', background: 'none', cursor: 'pointer' }}>
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
            </nav>

            <div className={styles.userInfo}>
                <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
                    alt="Alex Morgan"
                    className={styles.avatar}
                />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--foreground)' }}>Alex Morgan</span>
                    <span style={{ color: 'var(--muted)', fontSize: '0.75rem' }}>Product Designer</span>
                </div>
            </div>
        </div>
    );

    return (
        <>
            {/* Mobile Overlay */}
            <div
                className={`${styles.overlay} ${isOpen ? styles.visible : ''}`}
                onClick={onClose}
            />

            {sidebarContent}
        </>
    );
};

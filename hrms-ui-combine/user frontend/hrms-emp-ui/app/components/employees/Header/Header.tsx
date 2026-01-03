"use client";

import React from 'react';
import { Menu, Search, Bell } from 'lucide-react';
import styles from './Header.module.css';
import { Button } from '@/app/components/employees/Button/Button';

interface HeaderProps {
    onMenuClick: () => void;
    title?: string;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick, title }) => {
    return (
        <header className={styles.header}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <button className={styles.hamburger} onClick={onMenuClick}>
                    <Menu size={24} />
                </button>
                <span className={styles.title}>{title || 'Dayflow HRMS'}</span>
            </div>

            <div className={styles.actions}>
                <div className={styles.searchContainer}>
                    <Search size={16} className={styles.searchIcon} />
                    <input
                        type="text"
                        placeholder="Search..."
                        className={styles.searchInput}
                    />
                </div>

                <Button variant="outline" size="sm" icon={<Bell size={16} />}>

                </Button>
            </div>
        </header>
    );
};

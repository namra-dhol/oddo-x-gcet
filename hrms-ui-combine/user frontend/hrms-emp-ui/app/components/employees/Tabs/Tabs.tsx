"use client";

import React, { useState, ReactNode } from 'react';
import styles from './Tabs.module.css';

interface TabItem {
    id: string;
    label: string;
    content: ReactNode;
    locked?: boolean;
}

interface TabsProps {
    items: TabItem[];
    defaultTab?: string;
}

export const Tabs: React.FC<TabsProps> = ({ items, defaultTab }) => {
    const [activeTab, setActiveTab] = useState(defaultTab || items[0].id);

    return (
        <div className={styles.tabsContainer}>
            <div className={styles.tabList}>
                {items.map((item) => (
                    !item.locked && (
                        <button
                            key={item.id}
                            className={`${styles.tabButton} ${activeTab === item.id ? styles.active : ''}`}
                            onClick={() => setActiveTab(item.id)}
                        >
                            {item.label}
                        </button>
                    )
                ))}
            </div>
            <div className={styles.tabContent}>
                {items.find((item) => item.id === activeTab)?.content}
            </div>
        </div>
    );
};

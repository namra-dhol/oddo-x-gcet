import React, { ReactNode } from 'react';
import styles from './StatsCard.module.css';

interface StatsCardProps {
    label: string;
    value: string | number;
    icon: ReactNode;
}

export const StatsCard: React.FC<StatsCardProps> = ({ label, value, icon }) => {
    return (
        <div className={styles.card}>
            <div className={styles.iconContainer}>
                {icon}
            </div>
            <div className={styles.info}>
                <span className={styles.label}>{label}</span>
                <span className={styles.value}>{value}</span>
            </div>
        </div>
    );
};

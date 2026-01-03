import React from 'react';
import styles from './Badge.module.css';

interface BadgeProps {
    status: 'success' | 'warning' | 'danger' | 'neutral';
    text: string;
}

export const Badge: React.FC<BadgeProps> = ({ status, text }) => {
    return (
        <span className={`${styles.badge} ${styles[status]}`}>
            {text}
        </span>
    );
};

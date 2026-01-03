"use client";

import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    children?: ReactNode;
    icon?: ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    size = 'md',
    children,
    className = '',
    icon,
    ...props
}) => {
    return (
        <motion.button
            className={`${styles.button} ${styles[variant]} ${styles[size]} ${className}`}
            whileTap={{ scale: 0.96 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.1 }}
            {...(props as HTMLMotionProps<"button">)}
        >
            {icon && <span className={styles.icon}>{icon}</span>}
            {children}
        </motion.button>
    );
};

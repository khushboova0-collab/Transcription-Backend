import React from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary';
    isLoading?: boolean;
}

export const Button: React.FC<Props> = ({ children, variant = 'primary', isLoading, ...props }) => {
    const base = "px-4 py-2 rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed";
    const styles = variant === 'primary'
        ? "bg-blue-600 text-white hover:bg-blue-700"
        : "bg-gray-200 text-gray-800 hover:bg-gray-300";

    return (
        <button className={`${base} ${styles}`} disabled={isLoading || props.disabled} {...props}>
            {isLoading ? 'Processing...' : children}
        </button>
    );
};

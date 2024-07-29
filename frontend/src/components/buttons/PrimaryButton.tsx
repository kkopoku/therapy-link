import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
}

const PrimaryButton: React.FC<ButtonProps> = ({ children, className = '', ...props }) => {
    return (
        <button
            className={`w-full rounded-md min-h-10 text-white text-sm bg-[#060f0e] transition-all hover:bg-[#1A3634] ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default PrimaryButton;

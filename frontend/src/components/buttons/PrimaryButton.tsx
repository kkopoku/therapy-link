import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
}

const PrimaryButton: React.FC<ButtonProps> = ({ children, className = '', ...props }) => {
    return (
        <button
            className={`w-full rounded-md min-h-10 text-white text-sm bg-primaryGreen transition-all hover:bg-secondaryGreen ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default PrimaryButton;

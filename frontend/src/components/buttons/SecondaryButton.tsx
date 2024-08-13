import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
}

const SecondaryButton: React.FC<ButtonProps> = ({ children, className = '', ...props }) => {
    return (
        <button
            className={`w-full rounded-md min-h-10 text-white text-sm bg-[#000000] transition-all hover:bg-opacity-70 ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default SecondaryButton;

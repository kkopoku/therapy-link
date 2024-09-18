import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, className = '', ...props }) => {
    return (
        <button
            className={`w-full rounded-md min-h-10 transition-all ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;

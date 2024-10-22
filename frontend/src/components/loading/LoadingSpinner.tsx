import React from "react";

interface LoadingSpinnerProps {
    isDark?: string;
    show?: boolean;
    size: number;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({isDark, show = true, size}) => {
    return (
        <svg
            className={`border-2 border-slate-200 border-b-primaryGreen animate-spin rounded-full max-h-[${size}px] ${!show && `hidden`}`}
            viewBox="0 0 24 24"
        />
    );
};

export default LoadingSpinner;
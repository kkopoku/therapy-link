import React from "react";

interface LoadingSpinnerProps {
    isDark?: string;
    show?: boolean;
    size?: number
    border?: number
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({isDark, show = true, size=20, border=2}) => {


    return (
        <svg
            className={`border-slate-200 border-b-primaryGreen animate-spin rounded-full ${!show && `hidden`}`}
            style={{ width: `${size}px`, height: `${size}px`, borderWidth: `${border}px` }}
            viewBox="0 0 24 24"
        />
    );
};

export default LoadingSpinner;
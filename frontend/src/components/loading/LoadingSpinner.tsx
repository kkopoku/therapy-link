import React from "react";

interface LoadingSpinnerProps {
    isDark?: string;
    show?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({isDark, show = true}) => {
    return (
        <svg
            className={`border-2 border-slate-200 border-b-primaryGreen animate-spin rounded-full w-5 ${!show && `hidden`}`}
            viewBox="0 0 24 24"
        />
    );
};

export default LoadingSpinner;
import React from "react";

interface LoadingSpinnerProps {
    isDark?: string;
    show?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({isDark, show = true}) => {
    return (
        <svg
            className={`border-[5px] border-slate-200 border-b-primaryGreen animate-spin rounded-full max-h-20 ${!show && `hidden`}`}
            viewBox="0 0 24 24"
        />
    );
};

export default LoadingSpinner;
import React from 'react';

interface InfoCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ icon, title, description }) => {
    return (
        <div className="flex flex-row gap-1">
            <div className="w-fit mt-[6px]">
                {icon}
            </div>
            <div className="w-full flex flex-col gap-y-2">
                <p className="lg:text-lg text-base font-bold">{title}</p>
                <p className="lg:text-sm text-xs font-light text-slate-700">{description}</p>
            </div>
        </div>
    );
};

export default InfoCard;

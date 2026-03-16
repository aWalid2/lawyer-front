import React from 'react'

interface CardLayoutProps {
    children: React.ReactNode;
}

export const CardLayout: React.FC<CardLayoutProps> = ({ children }) => {
    return (
        <div className="rounded-[24px] bg-white p-6 border border-[#D9D9D9]">
            {children}
        </div>
    )
}

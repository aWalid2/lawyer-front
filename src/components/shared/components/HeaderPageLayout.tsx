import React from 'react'

interface HeaderPageLayoutProps {
    children: React.ReactNode;
}

export const HeaderPageLayout = ({ children }: HeaderPageLayoutProps) => {
    return (
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 w-full pb-6">
            {children}
        </div>
    )
}

import React from "react";

const Loading: React.FC = () => {
    return (
        <div className="fixed inset-0 z-9999 flex items-center justify-center bg-white">
            <div className=" animate-pulse">
                <img
                    src="/images/logo.webp"
                    alt="logo"
                    className="w-40 h-[62.28px]  sm:w-70"
                    fetchPriority="high"
                />

            </div>
        </div>
    );
};

export default Loading;

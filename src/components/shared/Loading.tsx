import React from "react";

const Loading: React.FC = () => {
    return (
        <div className="fixed inset-0 z-9999 flex items-center justify-center bg-white">
            <div className=" animate-pulse">
                <img
                    src="/images/logo.webp"
                    alt="logo"
                    className=" sm:w-70 w-40"

                />

            </div>
        </div>
    );
};

export default Loading;

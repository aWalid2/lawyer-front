import React from "react";

const PageLayout = ({
  children,
  className,
  innerPage,
}: {
  children: React.ReactNode;
  className?: string;
  innerPage?: boolean;
}) => {
  return (
    <div
      className={`bg-white rounded-[12px] ${innerPage ? "mt-0" : "mt-6"}  p-6 shadow-primary min-h-[600px] ${className}`}
    >
      {children}
    </div>
  );
};

export default PageLayout;

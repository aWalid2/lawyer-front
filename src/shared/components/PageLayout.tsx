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
      className={`rounded-main bg-white dark:bg-[#484848] ${innerPage ? "mt-0" : "mt-6"} shadow-primary min-h-[600px] p-6 ${className}`}
    >
      {children}
    </div>
  );
};

export default PageLayout;

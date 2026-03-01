import React from "react";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-white rounded-[12px] mt-6 p-6 shadow-primary min-h-[600px] ">
      {children}
    </div>
  );
};

export default PageLayout;

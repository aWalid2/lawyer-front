import React from "react";

export const CustomLayoutBorder: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="dark:bg-backgroundDark rounded-2xl border border-[#eeeeee] bg-white p-4 md:p-6 dark:border-white/10">
      {children}
    </div>
  );
};

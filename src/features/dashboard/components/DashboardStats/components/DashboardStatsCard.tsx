import { Card } from "@/components/ui/card";
import React from "react";

export const DashboardStatsCard = ({
  title,
  count,
  icon,
  iconBg,
}: {
  title: string;
  count: string;
  icon: React.ReactNode;
  iconBg: string;
}) => {
  return (
    <Card className="shadow-primary dark:bg-backgroundDark flex w-full flex-row items-center justify-between border-0 p-6">
      <div className="flex flex-col text-left rtl:text-right">
        <span className="text-xl font-semibold sm:text-2xl">{count}</span>
        <span className="mt-1 text-sm font-normal text-[#4C4F52] sm:text-base">
          {title}
        </span>
      </div>
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-full ${iconBg} p-3`}
      >
        {icon}
      </div>
    </Card>
  );
};

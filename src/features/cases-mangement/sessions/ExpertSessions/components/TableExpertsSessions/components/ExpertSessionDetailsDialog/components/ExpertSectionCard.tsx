import { CustomLayoutBorder } from "@/shared/components/CustomLayoutBorder";
import React from "react";

interface ExpertSectionCardProps {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}

export const ExpertSectionCard: React.FC<ExpertSectionCardProps> = ({
  title,
  children,
  action,
}) => {
  return (
    <CustomLayoutBorder>
      <div className="flex items-center justify-between pb-6">
        <h2 className="font-cairo text-secondary text-xl font-semibold">
          {title}
        </h2>
        {action}
      </div>
      {children}
    </CustomLayoutBorder>
  );
};

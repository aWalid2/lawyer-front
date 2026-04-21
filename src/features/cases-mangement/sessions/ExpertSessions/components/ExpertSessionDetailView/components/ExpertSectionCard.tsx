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
    <div className="rounded-xl border border-gray-300 p-6">
      <div className="flex items-center justify-between pb-6">
        <h2 className="font-cairo text-secondary text-xl font-semibold">
          {title}
        </h2>
        {action}
      </div>
      {children}
    </div>
  );
};

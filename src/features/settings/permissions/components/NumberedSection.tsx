import React, { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface NumberedSectionProps {
  number: number;
  title: string;
  children: ReactNode;
  headerAction?: ReactNode;
  className?: string;
  contentClassName?: string;
}

export const NumberedSection: React.FC<NumberedSectionProps> = ({
  number,
  title,
  children,
  headerAction,
  className,
  contentClassName,
}) => {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-[#476274] text-white flex items-center justify-center text-[10px]">
            {number}
          </div>
          <h2 className="text-[#476274] font-bold text-lg">{title}</h2>
        </div>
        
        {headerAction && (
          <div className="flex gap-2">
            {headerAction}
          </div>
        )}
      </div>

      <div className={cn("pr-6", contentClassName)}>
        {children}
      </div>
    </div>
  );
};

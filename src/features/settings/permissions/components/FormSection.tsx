import React, { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";

interface FormSectionProps {
  number?: number;
  title: string;
  children: ReactNode;
  headerAction?: ReactNode;
  className?: string;
  contentClassName?: string;
  hasCheckbox?: boolean;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export const FormSection: React.FC<FormSectionProps> = ({
  number,
  title,
  children,
  headerAction,
  className,
  contentClassName,
  hasCheckbox,
  checked,
  onCheckedChange,
}) => {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {number !== undefined && (
            <div className="w-4 h-4 rounded-full bg-[#476274] text-white flex items-center justify-center text-[10px]">
              {number}
            </div>
          )}
          {hasCheckbox && (
            <Checkbox checked={checked} onCheckedChange={onCheckedChange} />
          )}
          <h2 className="text-[#476274] font-bold text-lg">{title}</h2>
        </div>

        {headerAction && (
          <div className="flex gap-2">
            {headerAction}
          </div>
        )}
      </div>

      <div className={cn(contentClassName)}>
        {children}
      </div>
    </div>
  );
};

import React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface ToggleSwitchProps {
  id: string;
  leftLabel: string;
  rightLabel: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  id,
  leftLabel,
  rightLabel,
  leftIcon,
  rightIcon,
  checked,
  onCheckedChange,
}) => {
  return (
    <div className="flex items-center justify-center gap-4 rounded-xl bg-gray-50 p-3 dark:bg-white/5">
      <Label
        htmlFor={id}
        className={`flex cursor-pointer items-center gap-2 text-sm font-medium transition-colors ${
          !checked ? "text-[#153A4D]" : "text-gray-400"
        }`}
      >
        {leftIcon}
        {leftLabel}
      </Label>
      <Switch id={id} checked={checked} onCheckedChange={onCheckedChange} />
      <Label
        htmlFor={id}
        className={`flex cursor-pointer items-center gap-2 text-sm font-medium transition-colors ${
          checked ? "text-[#153A4D]" : "text-gray-400"
        }`}
      >
        {rightIcon}
        {rightLabel}
      </Label>
    </div>
  );
};

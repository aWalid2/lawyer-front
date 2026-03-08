import React from "react";
import { CheveronDownIcon } from "@/components/shared/icons/CheveronDown";
import { HeaderActionButton } from "@/components/shared/components/HeaderActionButton";

interface DocumentsFilterProps {
  onFilterChange: (status: string) => void;
}

export const DocumentsFilter: React.FC<DocumentsFilterProps> = ({ onFilterChange }) => {
  return (
    <HeaderActionButton
      variant="outline"
      label="هجريا"
      icon={<CheveronDownIcon className="size-4 text-[#A0AEC0]" />}
      iconPosition="left"
      onClick={() => onFilterChange("all")}
      className="flex-1 md:w-full md:max-w-[140px] rounded-[18px] h-12.5"
    />
  );
};

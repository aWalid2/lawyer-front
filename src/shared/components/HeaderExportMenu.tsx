import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown, FileSpreadsheet, FileText } from "lucide-react";
import React from "react";
import { HeaderActionButton } from "./HeaderActionButton";

export type HeaderExportType = "pdf" | "excel";

interface HeaderExportMenuProps {
  onSelect: (type: HeaderExportType) => void;
  label?: string;
  className?: string;
}

const exportOptions: Array<{
  type: HeaderExportType;
  label: string;
  icon: React.ReactNode;
}> = [
  {
    type: "pdf",
    label: "PDF",
    icon: <FileText size={18} className="text-[#BF9A61]" />,
  },
  {
    type: "excel",
    label: "Excel",
    icon: <FileSpreadsheet size={18} className="text-[#217346]" />,
  },
];

export const HeaderExportMenu: React.FC<HeaderExportMenuProps> = ({
  onSelect,
  label = "تصدير",
  className = "rounded-main h-12.5 px-8",
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <HeaderActionButton
          label={label}
          icon={<ChevronDown size={18} />}
          iconPosition="right"
          variant="gradient"
          className={className}
        />
      </PopoverTrigger>

      <PopoverContent
        align="end"
        className="w-48 rounded-[18px] border border-[#E2E8F0] bg-white p-2"
      >
        {exportOptions.map((option) => (
          <button
            key={option.type}
            type="button"
            onClick={() => onSelect(option.type)}
            className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-right text-sm font-medium text-[#4A5568] transition-colors hover:bg-[#F7FAFC]"
          >
            <span>{option.label}</span>
            {option.icon}
          </button>
        ))}
      </PopoverContent>
    </Popover>
  );
};

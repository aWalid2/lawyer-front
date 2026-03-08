import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DocumentsFilterProps {
  onFilterChange: (status: string) => void;
}

export const DocumentsFilter: React.FC<DocumentsFilterProps> = ({ onFilterChange }) => {
  return (
    <div className="w-full md:w-[140px]">
      <Select onValueChange={onFilterChange} defaultValue="clients">
        <SelectTrigger className="w-full h-12.5 rounded-[18px] border-[#E2E8F0] bg-white text-primary-text focus:border-[#BF9A61] focus:ring-2 focus:ring-[#BF9A61]/10 outline-none transition-all">
          <SelectValue placeholder="نسخة من المستندات" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="clients">موكلين</SelectItem>
          <SelectItem value="cases">قضايا</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

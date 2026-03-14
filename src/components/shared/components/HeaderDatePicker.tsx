
import { format } from "date-fns";
import { CalendarIcon, XIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ar } from "date-fns/locale";

interface HeaderDatePickerProps {
  date?: Date;
  onDateChange: (date?: Date) => void;
  placeholder?: string;
  className?: string;
}

export function HeaderDatePicker({
  date,
  onDateChange,
  placeholder = "التاريخ",
  className,
}: HeaderDatePickerProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "flex items-center gap-2 px-4 h-12.5 rounded-[18px] border border-[#E2E8F0] bg-white text-[#4A5568] text-sm hover:border-[#BF9A61] transition-all min-w-[110px] justify-start font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon size={18} className="text-[#A0AEC0]" />
            {date ? format(date, "PPP", { locale: ar }) : <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 rounded-[18px] overflow-hidden" align="end">
          <Calendar
            mode="single"
            selected={date}
            onSelect={onDateChange}
            initialFocus
            locale={ar}
          />
        </PopoverContent>
      </Popover>
      {date && (
        <button
          onClick={() => onDateChange(undefined)}
          className="p-1 hover:bg-gray-100 rounded-full text-gray-400 transition-colors"
          title="مسح التاريخ"
        >
          <XIcon size={16} />
        </button>
      )}
    </div>
  );
}

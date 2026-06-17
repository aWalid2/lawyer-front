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
              "hover:border-primary/50 hover:bg-primary/5 hover:text-primary flex h-12.5 min-w-[110px] items-center justify-start gap-2 rounded-[18px] border border-[#E2E8F0] bg-white px-4 text-sm font-normal text-[#4A5568] transition-all",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon size={18} className="text-[#A0AEC0]" />
            {date ? (
              format(date, "PPP", { locale: ar })
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto overflow-hidden rounded-[18px] p-0"
          align="end"
        >
          <Calendar
            mode="single"
            selected={date}
            onSelect={onDateChange}
            initialFocus
            locale={ar}
            captionLayout="dropdown"
            startMonth={new Date(new Date().getFullYear() - 10, 0)}
            endMonth={new Date(new Date().getFullYear() + 5, 11)}
            classNames={{
              dropdown_root: "relative rounded-md shadow-none",
            }}
          />
        </PopoverContent>
      </Popover>
      {date && (
        <button
          onClick={() => onDateChange(undefined)}
          className="rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100"
          title="مسح التاريخ"
        >
          <XIcon size={16} />
        </button>
      )}
    </div>
  );
}

import PageLayout from "@/shared/components/PageLayout";
import { Calendar } from "@/components/ui/calendar";
import { ar } from "date-fns/locale";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getDefaultClassNames } from "react-day-picker";


interface CalendarPickerProps {
  selectedDate: Date | undefined;
  onDateSelect: (date: Date | undefined) => void;
}

const CalendarPicker = ({ selectedDate, onDateSelect }: CalendarPickerProps) => {
  const navigate = useNavigate();
  const defaultClassNames = getDefaultClassNames();

  // Mock appointment dates matching the user's reference image (1, 11, 16, 21, 30)
  const today = new Date();
  const mockAppointmentDates = [
    new Date(today.getFullYear(), today.getMonth(), 1),
    new Date(today.getFullYear(), today.getMonth(), 11),
    new Date(today.getFullYear(), today.getMonth(), 16),
    new Date(today.getFullYear(), today.getMonth(), 21),
    new Date(today.getFullYear(), today.getMonth(), 30),
  ];

  const handleSelect = (date: Date | undefined) => {
    onDateSelect(date);
    if (date) {
      const dateStr = format(date, "yyyy-MM-dd");
      navigate(`/dashboard/daily-schedule?date=${dateStr}`);
    }
  };

  return (
    <PageLayout className="flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center overflow-x-auto w-full ">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleSelect}
          locale={ar}
          modifiers={{
            appointment: mockAppointmentDates,
          }}
          modifiersClassNames={{
            appointment: "!bg-secondary !text-white !rounded-[12px]",
          }}
          className="w-full p-0 dark:bg-transparent"
          classNames={{
            root: "w-full flex flex-col items-center justify-center relative",
            months: "w-full flex flex-col items-center justify-center",
            weekdays: "flex justify-between shadow-sm rounded-md py-6 w-full",
            month: "w-full max-w-7xl flex flex-col gap-8",
            day: "h-12 w-12 text-2xl font-medium flex items-center justify-center rounded-[12px] transition-all border border-transparent hover:bg-secondary/5 hover:border-secondary/20 text-secondary data-[today=true]:bg-primary data-[today=true]:text-white data-[selected-single=true]:bg-secondary! data-[selected-single=true]:text-white! data-[selected-single=true]:rounded-[12px]! m-auto mb-2",
            caption: "relative flex items-center justify-center pt-2 mb-12 h-20 w-full",
            caption_label: "text-2xl font-bold text-secondary flex items-center gap-3",
            button_previous: cn(
              buttonVariants({ variant: "ghost" }),
              "size-(--cell-size) p-0 select-none aria-disabled:opacity-50 hover:bg-secondary/10 hover:text-secondary bg-[#A7B2BA]/10 rounded-full w-12 h-12",
              defaultClassNames.button_previous
            ),
            button_next: cn(
              buttonVariants({ variant: "ghost" }),
              "size-(--cell-size) p-0 select-none aria-disabled:opacity-50 hover:bg-secondary/10 hover:text-secondary bg-[#A7B2BA]/10 rounded-full w-12 h-12",
              defaultClassNames.button_next
            ),

          }}
        />
      </div>
      <Button className="w-full mt-4">عرض كافة المواعيد</Button>
    </PageLayout>
  );
};

export default CalendarPicker;

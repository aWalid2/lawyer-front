import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ar } from "date-fns/locale";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/shared/components/PageLayout";

interface CalendarPickerProps {
  selectedDate: Date | undefined;
  onDateSelect: (date: Date | undefined) => void;
}

const CalendarPicker = ({ selectedDate, onDateSelect }: CalendarPickerProps) => {
  const navigate = useNavigate();

  const handleSelect = (date: Date | undefined) => {
    onDateSelect(date);
    if (date) {
      navigate("/dashboard/daily-schedule");
    }
  };

  return (
    <PageLayout>

      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={handleSelect}
        locale={ar}
        className="w-full h-full flex flex-col items-center justify-center p-0"
        classNames={{
          root: "w-full h-full flex flex-col items-center justify-center relative",
          months: "w-full h-full flex flex-col items-center justify-center",
          weekdays: "flex justify-between shadow-sm rounded-md py-6",
          month: "w-full h-full max-w-7xl flex flex-col gap-8",
          day: "h-12 w-12 text-2xl font-medium flex items-center justify-center rounded-[12px] transition-all border border-transparent  hover:bg-secondary/5 hover:border-secondary/20 text-secondary data-[selected-single=true]:!bg-secondary data-[selected-single=true]:!text-white data-[selected-single=true]:!rounded-[12px] m-auto mb-2",
          caption: "relative flex items-center justify-center pt-2 mb-12 h-20 w-full",
          caption_label: "text-2xl font-bold text-secondary flex items-center gap-3",
        }}
      />


    </PageLayout>
  );
};

export default CalendarPicker;

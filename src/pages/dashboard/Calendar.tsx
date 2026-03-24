import CalendarPicker from "@/features/dashboard/calendar/CalendarPicker";
import { useState } from "react";

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  return (

    <CalendarPicker
      selectedDate={selectedDate}
      onDateSelect={setSelectedDate}
    />


  );
};

export default CalendarPage;

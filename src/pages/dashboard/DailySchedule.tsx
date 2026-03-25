import DailyScheduleFeature from "@/features/calendar/DailySchedule";
import { useSearchParams } from "react-router-dom";
import { parseISO } from "date-fns";

const DailySchedulePage = () => {
  const [searchParams] = useSearchParams();
  const dateParam = searchParams.get("date");
  const selectedDate = dateParam ? parseISO(dateParam) : new Date();

  return (

    <DailyScheduleFeature selectedDate={selectedDate} />

  );
};

export default DailySchedulePage;

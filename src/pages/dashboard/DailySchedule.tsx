import { useSearchParams } from "react-router-dom";
import { parseISO } from "date-fns";
import DailySchedule from "@/features/calendar/DailySchedule";

const DailySchedulePage = () => {
  const [searchParams] = useSearchParams();
  const dateParam = searchParams.get("date");
  const selectedDate = dateParam ? parseISO(dateParam) : new Date();

  return <DailySchedule selectedDate={selectedDate} />;
};

export default DailySchedulePage;

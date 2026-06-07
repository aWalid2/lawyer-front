import DashboardStats from "./components/DashboardStats";
import DashboardLatestSessions from "./components/DashboardLatestSessions";
import CalendarPicker from "@/features/calendar/CalendarPicker";

import Incomplete from "./components/Incomplete";
import { useState } from "react";

export const DashboardFeature = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  return (
    <div className="mt-6 flex flex-col gap-6">
      <DashboardStats />
      <DashboardLatestSessions />
      <CalendarPicker
        selectedDate={selectedDate}
        onDateSelect={setSelectedDate}
      />
      <Incomplete />
    </div>
  );
};

import DashboardStats from "./components/DashboardStats";
import DashboardLatestSessions from "./components/DashboardLatestSessions";
import CalendarPicker from "./components/CalendarPicker";
import IncompleteProcedures from "./components/IncompleteProcedures";

export const DashboardFeature = () => {
  return (
    <div className="mt-6 flex flex-col gap-6">
      <DashboardStats />
      <DashboardLatestSessions />
      <CalendarPicker selectedDate={undefined} onDateSelect={() => {}} />
      <IncompleteProcedures />
    </div>
  );
};

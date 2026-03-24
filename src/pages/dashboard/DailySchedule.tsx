import DailyScheduleFeature from "@/features/dashboard/calendar/DailySchedule";

const DailySchedulePage = () => {
  return (
    <div className="p-6 bg-[#f8fafb] min-h-screen rtl overflow-hidden">
      <DailyScheduleFeature selectedDate={new Date()} />
    </div>
  );
};

export default DailySchedulePage;

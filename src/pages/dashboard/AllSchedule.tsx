import { AllScheduleFeatures } from "@/features/calendar/AllSchedule";
import PageLayout from "@/shared/components/PageLayout";

const AllSchedule = () => {
  return (
    <PageLayout className="flex flex-col">
      <AllScheduleFeatures />
    </PageLayout>
  );
};

export default AllSchedule;

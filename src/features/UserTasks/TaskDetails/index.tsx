import React from "react";
import { HeaderTitle } from "@/shared/components/HeaderTitle";
import LoadingPage from "@/shared/components/LoadingPage";
import { Error } from "@/shared/components/Error";
import HeaderSection from "./components/HeaderSection";
import TaskMainDetails from "./components/TaskMainDetails";
import Timeline from "./components/Timeline";
import CommentsSection from "./components/CommentsSection";
import { useGetOneTask } from "../api/hooks/useGetOne";
import { useFetchCases } from "../api/hooks/useGetCase";
import { getStatusArabic } from "@/shared/utils/getProceduresDescionsArabic";

interface TaskDetailProps {
  id?: string;
}

const TaskDetails: React.FC<TaskDetailProps> = ({ id: propId }) => {
  const taskId = propId;

  const { data, isPending, isError, error } = useGetOneTask(taskId || "");
  const { data: cases } = useFetchCases();

  const casesMap = React.useMemo(() => {
    if (!cases?.data) return new Map();
    return new Map(
      cases.data.map((caseItem: any) => [
        String(caseItem.id || caseItem.case_id),
        caseItem.case_title,
      ]),
    );
  }, [cases]);

  const getTaskTypeDisplay = (TaskTitle: string): string => {
    if (!TaskTitle) return "-";

    if (casesMap.has(String(TaskTitle))) {
      return casesMap.get(String(TaskTitle));
    }

    return TaskTitle;
  };

  if (isPending) {
    return <LoadingPage />;
  }

  if (isError) {
    return (
      <Error
        message={`حدث خطأ: ${error?.message || "خطأ في تحميل البيانات"}`}
      />
    );
  }

  const task = data;

  if (!task) {
    return <Error message="لا توجد بيانات للمهمة" />;
  }

  const cleanDate = (date: string): string => {
    if (!date) return "";
    const d = new Date(date);
    if (isNaN(d.getTime())) return "";
    return d.toISOString().split("T")[0];
  };

  const tasksMainDetailsData = {
    TaskTitle: getTaskTypeDisplay(task.task_title),
    PersonInCharge:
      task.assignee?.first_name || task.assigned_to?.toString() || "",
    DeliveryDate: cleanDate(task.delivery_date),
    status: getStatusArabic(task.status),
  };

  const timeline = {
    startDate: cleanDate(task.created_at),
    endDate: cleanDate(task.delivery_date),
  };

  const commentsData = {
    description: task.details || task.notes || "لا يوجد وصف",
  };

  return (
    <>
      <HeaderTitle title="تفاصيل المهمة" />

      <HeaderSection status={getStatusArabic(task.status)} />

      <TaskMainDetails task={tasksMainDetailsData} />

      <Timeline startdate={timeline.startDate} endDate={timeline.endDate} />

      <CommentsSection description={commentsData.description} />
    </>
  );
};

export default TaskDetails;

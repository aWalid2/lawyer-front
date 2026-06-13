import { LayoutDialog } from "@/shared/components/LayoutDialog";
import { Error } from "@/shared/components/Error";
import { InputBox } from "@/shared/components/InputBox";
import LoadingPage from "@/shared/components/LoadingPage";
import { DateIcon } from "@/shared/icons/Date";
import { useGetOneTask } from "@/features/UserTasks/api/hooks/useGetOne";
import { formatDateToYYYYMMDD } from "@/shared/utils/convertDate";
import React from "react";

interface TaskDetailsDialogProps {
  taskId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const TaskDetailsDialog: React.FC<TaskDetailsDialogProps> = ({
  taskId,
  open,
  onOpenChange,
}) => {
  const { data: task, isPending, isError, error } = useGetOneTask(taskId, open);

  return (
    <LayoutDialog
      title="تفاصيل المهمة"
      open={open}
      onOpenChange={onOpenChange}
      size="xl"
      padding="wide"
    >
      {isPending ? (
        <LoadingPage />
      ) : isError || !task ? (
        <Error message="حدث خطأ أثناء جلب تفاصيل المهمة." error={error} />
      ) : (
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
          <InputBox label="عنوان المهمة" text={task.task_title || "-"} />
          <InputBox
            label="تاريخ التسليم"
            text={
              task.delivery_date
                ? formatDateToYYYYMMDD(task.delivery_date)
                : "-"
            }
            icon={<DateIcon />}
          />
          <InputBox label="نوع المهمة" text={task.task_type || "-"} />
          <InputBox label="الحالة" text={task.status || "-"} />
          <InputBox
            label="تاريخ البدء"
            text={task.start_date ? formatDateToYYYYMMDD(task.start_date) : "-"}
            icon={<DateIcon />}
          />
          <InputBox
            label="تاريخ الانتهاء"
            text={task.end_date ? formatDateToYYYYMMDD(task.end_date) : "-"}
            icon={<DateIcon />}
          />
          <InputBox label="المسند من" text={task.assigner || "-"} />
          <InputBox label="ملاحظات" text={task.notes || "-"} />
        </div>
      )}
    </LayoutDialog>
  );
};

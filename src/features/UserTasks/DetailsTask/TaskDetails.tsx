import { InputBox } from "@/shared/components/InputBox";

interface TaskDetailsFormProps {
  task: {
    TaskType: string;
    PersonInCharge: string;
    DeliveryDate: string;
    status: string;
  };
}

const fieldClasses = {
  grid: "grid grid-cols-1 md:grid-cols-2 gap-6",
};

export default function TaskDetails({ task }: TaskDetailsFormProps) {
  return (
    <div className="mt-8 w-full rounded-2xl border border-[#D9D9D9] p-6">
      <h1 className="mb-6 text-lg font-bold">تفاصيل المهمة</h1>

      <div className={fieldClasses.grid}>
        <InputBox label="نوع المهمة" text={task.TaskType} />
        <InputBox label="المسؤول عن المهمة" text={task.PersonInCharge} />
        <InputBox label="تاريخ التسليم" text={task.DeliveryDate} />
        <InputBox label="حالة المهمة" text={task.status} />
      </div>
    </div>
  );
}

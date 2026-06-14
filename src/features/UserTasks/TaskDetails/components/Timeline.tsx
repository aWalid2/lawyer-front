import { InputBox } from "@/shared/components/InputBox";

export default function Timeline({
  startdate,
  endDate,
}: {
  startdate: string;
  endDate: string;
}) {
  return (
    <div className="mt-8 w-full rounded-2xl border border-[#D9D9D9] p-6">
      <h1 className="mb-6 text-lg font-bold">الجدول الزمني</h1>

      <div className={"grid grid-cols-1 gap-6 md:grid-cols-2"}>
        <InputBox label="تاريخ بداية المهمة" text={startdate} />
        <InputBox label="تاريخ تنفيذ المهمة" text={endDate} />
      </div>
    </div>
  );
}

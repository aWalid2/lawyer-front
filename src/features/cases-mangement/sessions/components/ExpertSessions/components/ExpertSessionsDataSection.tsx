import React from "react";
import { EditIcon } from "@/components/shared/icons/Edit";
import { DateIcon } from "@/components/shared/icons/Date";
import type { ExpertData } from "./typesExpert";
import { ExpertBox } from "./ExpertBox";
import { EditExpertDataDialog } from "./EditExpertDataDialog";

export const ExpertSessionsDataSection: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [data, setData] = React.useState<ExpertData>({
    expertName: "محمد المنصور",
    referralDate: "2024-03-01",
    officeLocation: "الدائرة الـ 15",
    expertType: "حسابي",
  });

  const handleSaveChanges = (values: ExpertData) => {
    setData(values);
  };

  return (
    <div className="bg-white rounded-2xl p-4 md:p-6 border border-[#eeeeee]">
      <div className="flex justify-between items-center pb-8">
        <h1 className="text-[18px] font-semibold text-secondary font-cairo">بيانات الخبراء</h1>
        <button
          type="button"
          onClick={() => setIsDialogOpen(true)}
          className="flex items-center gap-2 bg-[#f1f1f3] text-[#3D3C48] px-4 py-2 rounded-lg transition-colors text-sm font-semibold h-12.5 hover:text-white hover:bg-secondary/90 transition-all font-cairo"
        >
          <EditIcon className="w-4 h-4" />
          تعديل
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        <ExpertBox label="اسم الخبير" text={data.expertName} />
        <ExpertBox label="تاريخ الإحالة" text={data.referralDate} icon={<DateIcon />} />

        <div className="flex flex-col md:flex-row gap-4 col-span-1 md:col-span-2">
          <ExpertBox label="مكان المكتب / الدائرة" text={data.officeLocation} />
          <ExpertBox label="تخصص الخبير" text={data.expertType} />
        </div>
      </div>

      <EditExpertDataDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSaveChanges}
        initialValues={data}
      />
    </div>
  );
};

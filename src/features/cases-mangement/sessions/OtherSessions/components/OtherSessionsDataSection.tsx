import React from "react";
import { EditIcon } from "@/shared/icons/Edit";
import { DateIcon } from "@/shared/icons/Date";
import type { OtherAdministrativeData } from "./typesOther";
import { OtherBox } from "./OtherBox";
import { EditOtherDataDialog } from "./EditOtherDataDialog";

export const OtherSessionsDataSection: React.FC = () => {
  const [data, setData] = React.useState<OtherAdministrativeData>({
    procedureType: "إجراء إداري عام",
    referralDate: "2024-03-01",
    adminEntity: "وزارة العدل",
    notes: "-",
  });

  const handleSaveChanges = (values: OtherAdministrativeData) => {
    setData(values);
  };

  return (
    <div className="bg-white rounded-2xl p-4 md:p-6 border border-[#eeeeee]">
      <div className="flex justify-between items-center pb-8">
        <h1 className="text-[18px] font-semibold text-secondary font-cairo text-right w-full">بيانات إدارية أخرى</h1>
        <EditOtherDataDialog
          onSave={handleSaveChanges}
          initialValues={data}
          trigger={
            <button
              type="button"
              className="flex items-center gap-2 bg-[#f1f1f3] text-[#3D3C48] px-4 py-2 rounded-lg transition-all text-sm font-semibold h-12.5 hover:text-white hover:bg-secondary/90 font-cairo"
            >
              <EditIcon className="w-4 h-4" />
              تعديل
            </button>
          }
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        <OtherBox label="نوع الإجراء" text={data.procedureType} />
        <OtherBox label="تاريخ الإحالة" text={data.referralDate} icon={<DateIcon />} />

        <div className="flex flex-col md:flex-row gap-4 col-span-1 md:col-span-2">
          <OtherBox label="الجهة الإدارية" text={data.adminEntity} />
        </div>

        <div className="col-span-1 md:col-span-2">
          <OtherBox label="ملاحظات" text={data.notes} />
        </div>
      </div>
    </div>
  );
};

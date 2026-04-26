import { formatDateToYYYYMMDD } from "@/shared/utils/convertDate";
import { InputBox } from "@/shared/components/InputBox";

export const BodyInfo = ({ items }: { items: any }) => {
  return (
    <>
      <div className="mb-4 flex flex-col gap-3 md:flex-row">
        <div className="flex-1">
          <InputBox text={items?.case_number} label="رقم القضية في المخفر" />
        </div>

        <div className="flex-1">
          <InputBox text={items?.judge_name} label="اسم المحقق" />
        </div>
      </div>

      <div className="mb-4 flex flex-col gap-3 md:flex-row">
        <div className="flex-1">
          <InputBox
            text={items?.investigation_authirity_transferd_from}
            label="جهة التحقيق المحول منها"
          />
        </div>

        <div className="flex-1">
          <InputBox
            text={formatDateToYYYYMMDD(items?.case_entry) || ""}
            label="تاريخ ورود القضية داخل المكتب"
          />
        </div>
      </div>

      <div className="flex flex-col" dir="rtl">
        <InputBox text={items?.station?.name} label="المخفر التابع له القضية" />
      </div>
    </>
  );
};

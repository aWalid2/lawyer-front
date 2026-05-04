import { InputBox } from "@/shared/components/InputBox";
import { formatDateToYYYYMMDD } from "@/shared/utils/convertDate";
import type { ClientContract } from "./types";

interface ContractDetailsProps {
  contract?: ClientContract | null;
}

export const ContractDetails: React.FC<ContractDetailsProps> = ({
  contract,
}) => {
  if (!contract) {
    return null;
  }

  return (
    <div className="rounded-xl border border-[#E8E8E8] p-4">
      <div className="mb-5 flex items-center justify-between gap-3 max-md:flex-col max-md:items-start">
        <h3 className="text-lg font-semibold text-[#153A4D]">بيانات العقد</h3>
        {contract.document_file && (
          <a
            href={contract.document_file}
            target="_blank"
            rel="noreferrer"
            className="text-primary text-sm font-medium underline-offset-4 hover:underline"
          >
            عرض ملف العقد
          </a>
        )}
      </div>

      <div className="flex gap-3 max-md:flex-col">
        <div className="flex-1">
          <InputBox
            label="تاريخ بداية العقد"
            text={formatDateToYYYYMMDD(contract.start_date) || "-"}
          />
        </div>
        <div className="flex-1">
          <InputBox
            label="تاريخ نهاية العقد"
            text={formatDateToYYYYMMDD(contract.end_date) || "-"}
          />
        </div>
      </div>

      <div className="flex gap-3 pt-5 max-md:flex-col">
        <div className="flex-1">
          <InputBox label="قيمة العقد" text={contract.contract_value ?? "-"} />
        </div>
        <div className="flex-1">
          <InputBox
            label="مدة العقد"
            text={contract.contract_duration ?? "-"}
          />
        </div>
      </div>

      <div className="flex gap-3 pt-5 max-md:flex-col">
        <div className="flex-1">
          <InputBox
            label="تاريخ إنشاء العقد"
            text={formatDateToYYYYMMDD(contract.created_at) || "-"}
          />
        </div>
        <div className="flex-1">
          <InputBox label="رقم العقد" text={contract.id ?? "-"} />
        </div>
      </div>

      {contract.document_file && (
        <div className="mt-6">
          <h4>ملف العقد</h4>
          <div className="rounded-main mt-4 h-40 w-40 overflow-hidden bg-gray-200 max-md:w-full">
            <img
              src={contract.document_file}
              alt="ملف العقد"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      )}
    </div>
  );
};

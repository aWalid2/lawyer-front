import { InputBox } from "@/shared/components/InputBox";
import { formatDateToYYYYMMDD } from "@/shared/utils/convertDate";
import { CustomLayoutBorder } from "@/shared/components/CustomLayoutBorder";
import { ImagePreviewDialog } from "../../../../../../shared/components/ImagePreviewDialog";
import type { ClientContract } from "../../../types/client";

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
    <CustomLayoutBorder>
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

      <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
        <InputBox label="رقم العقد" text={contract.id ?? "-"} />

        <InputBox label="قيمة العقد" text={contract.contract_value ?? "-"} />

        <InputBox label="مدة العقد" text={contract.contract_duration ?? "-"} />

        <InputBox
          label="تاريخ بداية العقد"
          text={formatDateToYYYYMMDD(contract.start_date) || "-"}
        />

        <InputBox
          label="تاريخ نهاية العقد"
          text={formatDateToYYYYMMDD(contract.end_date) || "-"}
        />

        <InputBox
          label="تاريخ إنشاء العقد"
          text={formatDateToYYYYMMDD(contract.created_at) || "-"}
        />
      </div>

      {contract.document_file && (
        <div className="mt-6">
          <h4>ملف العقد</h4>
          <ImagePreviewDialog
            src={contract.document_file}
            alt="معاينة ملف العقد"
            title="معاينة ملف العقد"
            trigger={
              <button
                type="button"
                className="rounded-main mt-4 h-40 w-40 overflow-hidden bg-gray-200 text-right transition-opacity hover:opacity-90 max-md:w-full"
              >
                <img
                  src={contract.document_file}
                  alt="ملف العقد"
                  className="h-full w-full object-cover"
                />
              </button>
            }
          />
        </div>
      )}
    </CustomLayoutBorder>
  );
};

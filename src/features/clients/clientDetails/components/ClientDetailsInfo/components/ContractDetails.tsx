import { InputBox } from "@/shared/components/InputBox";
import { formatDateToYYYYMMDD } from "@/shared/utils/convertDate";
import { CustomLayoutBorder } from "@/shared/components/CustomLayoutBorder";
import { ImagePreviewCard } from "./ImagePreviewCard";
import { AddContractDialog } from "../../AddContractDialog";
import type { ClientContract } from "../../../types/client";

interface ContractDetailsProps {
  contracts?: ClientContract[] | null;
  clientId?: string | number;
}

export const ContractDetails: React.FC<ContractDetailsProps> = ({
  contracts,
  clientId,
}) => {
  if (!contracts || contracts.length === 0) {
    return null;
  }

  return (
    <>
      {contracts.map((contract, index) => (
        <CustomLayoutBorder key={contract.id ?? index}>
          <div className="mb-5 flex items-center justify-between gap-3 max-md:flex-col max-md:items-start">
            <h3 className="text-lg font-semibold text-[#153A4D]">
              {contracts.length > 1
                ? `بيانات العقد (${index + 1})`
                : "بيانات العقد"}
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
            <InputBox label="رقم العقد" text={contract.id ?? "-"} />

            <InputBox
              label="قيمة العقد"
              text={contract.contract_value ?? "-"}
            />

            <InputBox
              label="مدة العقد"
              text={contract.contract_duration ?? "-"}
            />

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
              <ImagePreviewCard
                label="ملف العقد"
                src={contract.document_file}
                alt="ملف العقد"
                title="معاينة ملف العقد"
              />
            </div>
          )}
        </CustomLayoutBorder>
      ))}

      {clientId && (
        <div className="flex justify-center">
          <AddContractDialog clientId={String(clientId)} />
        </div>
      )}
    </>
  );
};

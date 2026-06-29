import { InputBox } from "@/shared/components/inputs/InputBox";
import { formatDateToYYYYMMDD } from "@/shared/utils/convertDate";
import { ImagePreviewCard } from "../../ClientDetailsInfo/components/ImagePreviewCard";
import { AddPaymentDialog } from "./AddPaymentDialog";
import type { ClientContract } from "../../../types/client";

interface ContractInfoFieldsProps {
  contract: ClientContract;
}

export const ContractInfoFields = ({ contract }: ContractInfoFieldsProps) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
        <InputBox label="عنوان العقد" text={contract.contract_title ?? "-"} />

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
        <InputBox
          label="عدد القضايا المرتبطه بالعقد"
          text={contract.cases_related_contracts || "-"}
        />
        <div className="flex items-end gap-2">
          <div className="flex-1">
            <InputBox
              label="مدفوعات العقد"
              text={contract.contract_payment || "-"}
            />
          </div>
          {contract.id && <AddPaymentDialog contractId={contract.id} />}
        </div>
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
    </>
  );
};

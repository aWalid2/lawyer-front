import { InputBox } from "@/shared/components/InputBox";
import { formatDateToYYYYMMDD } from "@/shared/utils/convertDate";
import type { ClientDetailsData } from "../../../types/client";
import { CustomLayoutBorder } from "@/shared/components/CustomLayoutBorder";
import { ImagePreviewCard } from "./ImagePreviewCard";

interface BasicClientDetailsProps {
  client?: ClientDetailsData;
}

export const BasicClientDetails: React.FC<BasicClientDetailsProps> = ({
  client,
}) => {
  return (
    <CustomLayoutBorder>
      <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
        <InputBox label="كود الموكل" text={client?.user_id ?? "-"} />

        <InputBox label="اسم الموكل" text={client?.name ?? "-"} />

        <InputBox label="رقم الهاتف" text={client?.user?.phone ?? "-"} />

        <InputBox label="الدولة" text={client?.user?.country ?? "-"} />

        <InputBox label="الرقم المدني" text={client?.user?.ssn ?? "-"} />

        <InputBox label="الجنسية" text={client?.user?.nationality ?? "-"} />

        <InputBox label="الدولة" text={client?.user?.country ?? "-"} />

        <InputBox label="العنوان" text={client?.user?.address ?? "-"} />

        <InputBox label="البريد الإلكتروني" text={client?.user?.email ?? "-"} />

        <InputBox
          label="تاريخ التسجيل"
          text={formatDateToYYYYMMDD(client?.user?.created_at) || "-"}
        />
      </div>

      <div className="mt-6">
        <ImagePreviewCard
          src={client?.authorization_photo}
          alt="صورة التوكيل"
          label="صورة التوكيل"
          title="معاينة صورة التوكيل"
        />
      </div>
    </CustomLayoutBorder>
  );
};

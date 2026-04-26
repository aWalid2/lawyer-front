import LoadingPage from "@/shared/components/LoadingPage";
import { InputBox } from "@/shared/components/InputBox";
import { useGetClient } from "@/features/clients/clientDetails/api/hooks/useGetClient";
import { useParams } from "react-router-dom";
import { Error } from "@/shared/components/Error";
import { formatDateToYYYYMMDD } from "@/shared/utils/convertDate";

const ClientDetailsInfo: React.FC = () => {
  const { id } = useParams();
  const { data: client, isPending, isError } = useGetClient(id!);

  if (isPending) return <LoadingPage />;
  if (isError) return <Error />;
  return (
    <div className="rounded-xl border border-[#E8E8E8] p-4">
      <div className="mb-4">
        <InputBox label="كود الموكل" text={client?.user_id} />
      </div>
      <div className="flex items-end gap-3">
        <div className="flex-1">
          <InputBox label="اسم الموكل" text={client?.name} />
        </div>
        <div className="flex-1">
          <InputBox label="رقم الهاتف" text={client?.user?.phone} />
        </div>
        <div className="w-28">
          <InputBox label="الدولة" text={client?.user?.country} />
        </div>
      </div>
      <div className="flex gap-3 pt-5">
        <div className="flex-1">
          <InputBox label="الرقم المدني" text={client?.user?.ssn} />
        </div>
        <div className="flex-1">
          <InputBox label="الجنسية" text={client?.user?.nationality} />
        </div>
      </div>
      <div className="flex gap-3 pt-5">
        <div className="flex-1">
          <InputBox label="الدولة" text={client?.user?.country} />
        </div>

        <div className="flex-1">
          <InputBox label="العنوان" text={client?.user?.address} />
        </div>
      </div>
      <div className="flex gap-3 pt-5">
        <div className="flex-1">
          <InputBox label="البريد الإلكتروني" text={client?.user?.email} />
        </div>

        <div className="flex-1">
          <InputBox
            label="تاريخ التسجيل"
            text={formatDateToYYYYMMDD(client?.user?.created_at)}
          />
        </div>
      </div>

      <div className="mt-6">
        <h4>صورة التوكيل</h4>
        <div className="rounded-main mt-4 h-28 w-28 overflow-hidden bg-gray-200">
          <img
            src={client?.authorization_photo}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default ClientDetailsInfo;

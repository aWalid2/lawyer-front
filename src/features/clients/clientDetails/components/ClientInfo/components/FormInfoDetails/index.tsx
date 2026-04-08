
import ImageFormDetails from "./components/ImageFormDetails";
import { InputBox } from "./components/InputBox";
import { useGetClient } from "@/features/clients/clientDetails/api/hooks/useGetClient";
import { useParams } from "react-router-dom";

const ClientDetailsInfo: React.FC = () => {
  const { id } = useParams();
  const { data: client } = useGetClient(id!);
  console.log(client);

  return (

    <div className="border border-[#E8E8E8] p-4 rounded-xl  ">

      <div className="mb-4 ">
        <InputBox
          label="كود الموكل"
          text={client?.user_id}
        />
      </div>
      <div className="flex gap-3 items-end">
        <div className="flex-1">
          <InputBox
            label="اسم الموكل"
            text={client?.name}
          />
        </div>
        <div className="flex-1">
          <InputBox

            label="رقم الهاتف"
            text={client?.phone}
          />
        </div>
        <div className="w-28">

          <InputBox
            label="الدولة"
            text={client?.country}
          />
        </div>
      </div>
      <div className="flex gap-3 pt-5">
        <div className="flex-1">
          <InputBox
            label="الرقم المدني"
            text={client?.national_id}
          />
        </div>
        <div className="flex-1">
          <InputBox
            label="الجنسية"
            text={client?.nationality}
          />
        </div>
      </div>
      <div className="flex gap-3 pt-5">
        <div className="flex-1">
          <InputBox
            label="الدولة"
            text={client?.country}
          />
        </div>

        <div className="flex-1">
          <InputBox
            label="العنوان"
            text={client?.address}
          />
        </div>
      </div>
      <div className="flex gap-3 pt-5">
        <div className="flex-1">
          <InputBox
            label="البريد الإلكتروني"
            text={client?.email}
          />
        </div>

        <div className="flex-1">
          <InputBox
            label="تاريخ التسجيل"
            text={client?.created_at}
          />
        </div>
      </div>
      {/* <ImageFormDetails /> */}


    </div>

  );
};

export default ClientDetailsInfo;

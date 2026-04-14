
import { formatDateToYYYYMMDD } from '@/shared/utils/convertDate'
import { InputBox } from './InputBox'


export const BodyProsecutionInf = ({ data }: { data: any }) => {
  return (
    <div className="flex flex-col gap-4">
      <InputBox label="رقم القضية داخل النيابة:" text={data.case_number_at_Presecution} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputBox label="النيابة:" text={data.prosecution?.name} />
        <InputBox label="تاريخ تسجيل القضية داخل النيابة:" text={formatDateToYYYYMMDD(data.case_regestration_date_at_presecution)} />
      </div>
    </div>
  )
}

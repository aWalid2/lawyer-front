import React from 'react'
import { InputBox } from './InputBox'

export const BodyProsecutionInf = ({ data }: { data: any }) => {
  return (
    <>
      <InputBox label="رقم القضية داخل النيابة:" text={data.caseNumberInProsecution} />
      <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
        <InputBox label="النيابة:" text={data.prosecutionName} />
        <InputBox label="تاريخ تسجيل القضية داخل النيابة:" text={"يسبسيب"} />
      </div>
    </>
  )
}

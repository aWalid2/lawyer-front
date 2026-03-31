import { Field } from 'formik'
import React from 'react'


type InputFormProps = {
    name:string;
    placeholder?:string;
    disabled:boolean;
    label:string;
    type:string;
    dir?:string;
    value?:string;
}   



export const InputForm:React.FC<InputFormProps> = ({name,placeholder,disabled,label,type,dir,value}) => {
  return (
       <>
           <label className="block mb-4 text-sm ">{label}</label>
           <Field
           dir={dir}
             name={name}
             type={type}
             className="w-full border border-[#DBDBDB]/32 rounded-md p-2 bg-[#FBFBFB] h-[50px] text-[#828282] text-base placeholder:text-[#B5B5B5]  "
             placeholder={placeholder}
             disabled={disabled}
             value={value}
           />
         </>
  )
}

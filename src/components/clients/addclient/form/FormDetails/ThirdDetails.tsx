import { Field } from "formik";


export default function ThirdDetails() {
    return (
        <div className="flex gap-3 pt-5">

            <div className="flex-1">
                <label className="block mb-5 text-sm">العنوان</label>
                <Field
                    name="secondName"
                    type="text"
                    className="w-full border rounded-md p-2 bg-gray-50 h-[50px]"
                    placeholder="عنوان1"
                />
            </div>
            <div className="flex-1">
                <label className="block mb-5 text-sm">البريد الإلكتروني</label>
                <Field
                    name="phone"
                    type="text"
                    className="w-full border rounded-md  h-[50px] p-2 bg-gray-50 "
                    placeholder="example@gmail.com"
                />
            </div>
        </div>
    )
}
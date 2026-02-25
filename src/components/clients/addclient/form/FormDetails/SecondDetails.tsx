import { Field } from "formik";


export default function SecondDetails() {
    return (
        <div className="flex gap-3 pt-5">

            <div className="flex-1">
                <label className="block mb-5 text-sm">الرقم المدني</label>
                <Field
                    name="secondName"
                    type="text"
                    className="w-full border rounded-md p-2 bg-gray-50 h-[50px]"
                    placeholder="019389384"
                />
            </div>
            <div className="flex-1">
                <label className="block mb-5 text-sm">الجنسية</label>
                <Field
                    name="phone"
                    type="text"
                    className="w-full border rounded-md  h-[50px] p-2 bg-gray-50 "
                    placeholder="سعودي"
                />
            </div>
            <div className="flex-1">
                <label className="block mb-5 text-sm">الدولة</label>
                <Field
                    name="phone"
                    type="text"
                    className="w-full border rounded-md  h-[50px] p-2 bg-gray-50 "
                    placeholder="المملكة العربية السعودية"
                />
            </div>
        </div>
    )
}
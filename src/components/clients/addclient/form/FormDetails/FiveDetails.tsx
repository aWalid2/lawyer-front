import { Field } from "formik";

export default function FiveDetails() {
    return (
        <div className="pt-14" >
            <div className="flex flex-col gap-7 border border-gray-300 rounded-2xl p-5">
                <div className="flex gap-3 pt-5">

                    <div className="flex-1">
                        <label className="block mb-5 text-sm">كلمة المرور</label>
                        <Field
                            name="password"
                            type="password"
                            className="w-full border rounded-md p-2 bg-gray-50 h-[50px]"
                            placeholder="*************"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block mb-5 text-sm">تأكيد كلمة المرور</label>
                        <Field
                            name="password"
                            type="password"
                            className="w-full border rounded-md  h-[50px] p-2 bg-gray-50 "
                            placeholder="**************"
                        />
                    </div>

                </div>

            </div>
        </div>
    )
}
import { Field } from "formik";

export default function AddContract() {
    return (
        <div className="pt-6">
            <div className="border border-gray-300 p-4 rounded-xl">

                <h1 className="pb-7">
                    بيانات العقد
                </h1>

                <div className="pb-7" >
                    <label className="block mb-5 text-sm ">تاريخ بداية العقد</label>
                    <Field
                        name="firstName"
                        type="text"
                        className="w-full border rounded-md p-2 bg-gray-50 h-[50px]"
                        placeholder="16-2-2026"
                    />
                </div>
                <div className="pb-7" >
                    <label className="block mb-5 text-sm ">القيمة المتفق عليها</label>
                    <Field
                        name="firstName"
                        type="text"
                        className="w-full border rounded-md p-2 bg-gray-50 h-[50px]"
                        placeholder="50 ألف ريال سعودي"
                    />
                </div>
                <div className="pb-7" >
                    <label className="block mb-5 text-sm ">مدة العقد</label>
                    <Field
                        name="firstName"
                        type="text"
                        className="w-full border rounded-md p-2 bg-gray-50 h-[50px]"
                        placeholder=" سنتين"
                    />
                </div>
                <h1 className="pb-7">صورة العقد</h1>

                <div className="flex ">
                    <div className="w-[150px] h-[125px] border border-gray-300 border-dashed border-2 rounded-xl bg-gray-50 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-100 transition">

                        <p className="text-sm text-gray-400 flex flex-col gap-2">
                            انقر هنا لتحميل
                            <span>الصوره او سحبها</span>
                            <span> وإفلاتها</span>
                        </p>

                    </div>
                </div>

            </div>
        </div>
    )
}
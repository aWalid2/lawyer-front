import { Field } from "formik";

export default function FourDetails() {
    return (
        <div className="pt-14" >
            <div className="flex flex-col gap-7">
                <h1>صورة التوكيل</h1>

                <div className="flex ">
                    <div className="w-[150px] h-[125px] border border-gray-300 border-dashed border-2 rounded-xl bg-gray-50 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-100 transition">

                        <p className="text-sm text-gray-400 flex flex-col gap-2">
                            انقر هنا لتحميل
                            <span>الصوره او سحبها</span>
                            <span> وإفلاتها</span>
                        </p>

                    </div>
                </div>

                <div className="flex flex-col" dir="rtl">
                    <h1 className="pb-5 text-right">
                        ملاحظات
                    </h1>
                    <Field
                        name="notes"
                        as="textarea"
                        className="w-full border rounded-md p-2 text-sm bg-gray-50 h-[102px] resize-none text-right" // RTL text alignment
                        
                    />
                </div>
            </div>
        </div>
    )
}
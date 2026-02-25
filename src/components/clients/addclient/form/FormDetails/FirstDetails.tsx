import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {  Field } from "formik";

export default function FirstDetails() {

    return (
        <div>

            <div className="mb-4 ">
                <label className="block mb-5 text-sm ">نوع الموكل</label>
                <Field
                    name="firstName"
                    type="text"
                    className="w-full border rounded-md p-2 bg-gray-50 h-[50px]"
                    placeholder="أفراد"
                     />
                    
            </div>
            <div className="flex gap-3">
                <div className="flex-1">
                    <label className="block mb-5 text-sm">الاسم</label>
                    <Field
                        name="secondName"
                        type="text"
                        className="w-full border rounded-md p-2 bg-gray-50 h-[50px]"
                        placeholder="أحمد"
                    />
                </div>
                <div className="flex-1">
                    <label className="block mb-5 text-sm">رقم الهاتف</label>
                    <Field
                        name="phone"
                        type="text"
                        className="w-full border rounded-md  h-[50px] p-2 bg-gray-50 "
                        placeholder="5xxxxxxxxxxxx"
                    />
                </div>
                {/* كود الدولة */}
                <div className="w-28">
                    <label className="block mb-5 text-sm">الكود</label>

                    <Select
                        defaultValue="+20"
                        onValueChange={(value) => {
                            console.log(value);
                        }}
                    >
                        <SelectTrigger className="w-full border rounded-md p-2 bg-gray-50 h-[50px]">
                            <SelectValue placeholder="الكود" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="+20">🇪🇬 +20</SelectItem>
                            <SelectItem value="+966">🇸🇦 +966</SelectItem>
                            <SelectItem value="+971">🇦🇪 +971</SelectItem>
                            <SelectItem value="+1">🇺🇸 +1</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>

    )
}
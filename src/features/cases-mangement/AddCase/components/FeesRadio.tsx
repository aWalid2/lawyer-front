import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { InputForm } from "@/shared/components/InputForm"
import { useFormikContext } from "formik"


export function FeesRadio() {
    const { values, setFieldValue } = useFormikContext<any>()

    return (
        <>
            <RadioGroup
                name="case_fees_type"
                dir="rtl"
                value={values.case_fees_type}
                onValueChange={(val) => setFieldValue("case_fees_type", val)}
                className="w-full flex-row flex justify-between items-center"
            >
                <div className="flex items-center gap-3">
                    <RadioGroupItem value="fixed_profits" id="r1" />
                    <Label htmlFor="r1">أتعاب ثابتة</Label>
                </div>

                <div className="flex items-center gap-3">
                    <RadioGroupItem value="percentage_of_profits" id="r2" />
                    <Label htmlFor="r2">نسبة من الأرباح</Label>
                </div>

                <div className="flex items-center gap-3">
                    <RadioGroupItem value="contract_based" id="r3" />
                    <Label htmlFor="r3">تابعة للعقد</Label>
                </div>
            </RadioGroup>

            <div className="mt-4">
                {values.case_fees_type === "fixed_profits" && (
                    <InputForm
                        label="قيمة الأتعاب الثابتة"
                        name="fixed_profits"
                        type="number"
                        placeholder="0.00"
                    />
                )}

                {values.case_fees_type === "percentage_of_profits" && (
                    <div className="flex items-end gap-3 max-w-sm">
                        <div className="flex-1">
                            <InputForm
                                label="نسبة الأرباح المستحقة"
                                name="percentage_of_profits"
                                type="number"
                                placeholder="15"
                            />
                        </div>

                        <div className="mb-2.5 text-2xl font-bold bg-gray-50 px-4 py-2 rounded-lg border border-gray-200 text-gray-400">
                            %
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

import { InputBox } from './InputBox'
import type { FormValues } from '../../../types/typsePolice'

export const BodyInfo = ({ items }: { items: FormValues }) => {
    return (
        <>
            <div className="flex flex-col md:flex-row gap-3 mb-4">
                <div className="flex-1">
                    <InputBox
                        text={items.caseTitle}
                        label="رقم القضية في المخفر"
                    />
                </div>

                <div className="flex-1">
                    <InputBox
                        text={items.clientName}
                        label="اسم المحقق"
                    />
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-3 mb-4">
                <div className="flex-1">
                    <InputBox
                        text={items.investigationSource}
                        label="جهة التحقيق المحول منها"
                    />
                </div>

                <div className="flex-1">
                    <InputBox
                        text={items.caseReceiptDate}
                        label="تاريخ ورود القضية داخل المكتب"
                    />
                </div>
            </div>

            <div className="flex flex-col" dir="rtl">
                <InputBox
                    text={items.notes}
                    label="المخفر التابع له القضية"
                />
            </div>
        </>
    )
}
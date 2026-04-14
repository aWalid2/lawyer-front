import { formatDateToYYYYMMDD } from '@/shared/utils/convertDate'
import { InputBox } from '../../../../ProsecutionSessions/components/ProsecutionInfo/component/InputBox'

export const BodyInfo = ({ items }: { items: any }) => {
    return (
        <>
            <div className="flex flex-col md:flex-row gap-3 mb-4">
                <div className="flex-1">
                    <InputBox
                        text={items?.case_number}
                        label="رقم القضية في المخفر"
                    />
                </div>

                <div className="flex-1">
                    <InputBox
                        text={items?.judge_name}
                        label="اسم المحقق"
                    />
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-3 mb-4">
                <div className="flex-1">
                    <InputBox
                        text={items?.investigation_authirity_transferd_from}
                        label="جهة التحقيق المحول منها"
                    />
                </div>

                <div className="flex-1">
                    <InputBox
                        text={formatDateToYYYYMMDD(items?.case_entry) || ""}
                        label="تاريخ ورود القضية داخل المكتب"
                    />
                </div>
            </div>

            <div className="flex flex-col" dir="rtl">
                <InputBox
                    text={items?.station?.name}
                    label="المخفر التابع له القضية"
                />
            </div>
        </>
    )
}
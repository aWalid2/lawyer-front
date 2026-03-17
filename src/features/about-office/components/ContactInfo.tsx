import { Field } from "formik";
import { CLASSES } from "../index";

const ContactInfo = () => {
    return (
        <>
            <h2 className="text-sm md:text-base font-medium">معلومات التواصل</h2>
            <div className="border border-gray-300 p-4 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* البريد الإلكتروني */}
                    <div>
                        <label htmlFor="contactInfo.email" className={CLASSES.label}>
                            البريد الإلكتروني
                        </label>
                        <Field
                            type="email"
                            name="contactInfo.email"
                            className={`${CLASSES.input} h-[50px]`}
                            placeholder="example@domain.com"
                        />
                    </div>

                    {/* رقم الهاتف */}
                    <div>
                        <label htmlFor="contactInfo.phone" className={CLASSES.label}>
                            رقم الهاتف
                        </label>
                        <Field
                            type="tel"
                            name="contactInfo.phone"
                            className={`${CLASSES.input} h-[50px]`}
                            placeholder="+965 1234 5678"
                        />
                    </div>

                    {/* العنوان */}
                    <div>
                        <label htmlFor="contactInfo.address" className={CLASSES.label}>
                            العنوان
                        </label>
                        <Field
                            type="text"
                            name="contactInfo.address"
                            className={`${CLASSES.input} h-[50px]`}
                            placeholder="أدخل العنوان الكامل"
                        />
                    </div>

                    {/* أوقات العمل */}
                    <div>
                        <label htmlFor="contactInfo.workingHours" className={CLASSES.label}>
                            أوقات العمل
                        </label>
                        <Field
                            type="text"
                            name="contactInfo.workingHours"
                            className={`${CLASSES.input} h-[50px]`}
                            placeholder="مثلاً: السبت - الخميس 9:00 ص - 6:00 م"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContactInfo;
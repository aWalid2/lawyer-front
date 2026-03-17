import { Field } from "formik";
import { CLASSES } from "../index";

interface Props {
    values: any;
    setFieldValue: (field: string, value: any) => void;
}

const OfficeInfo = ({ values, setFieldValue }: Props) => {
    return (
        <>
            {/* قسم رفع الشعار */}
            <div>
                <h1 className="pb-3 md:pb-7 px-1 text-sm md:text-base">شعار المكتب</h1>
                <div className="flex">
                    <div className={`${CLASSES.uploadContainer} ${CLASSES.uploadBox}`}>
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            id="officeLogo"
                            onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                    setFieldValue("officeLogo", e.target.files[0]);
                                }
                            }}
                        />
                        <label htmlFor="officeLogo" className="cursor-pointer w-full h-full flex flex-col items-center justify-center">
                            <p className={CLASSES.uploadText}>
                                {values.officeLogo ? (
                                    values.officeLogo.name
                                ) : (
                                    <>
                                        انقر هنا لتحميل
                                        <br />
                                        الصوره او سحبها
                                        <br />
                                        وإفلاتها
                                    </>
                                )}
                            </p>
                        </label>
                    </div>
                </div>
            </div>

            {/* حقل اسم المكتب */}
            <div>
                <label htmlFor="officeName" className={CLASSES.label}>
                    اسم المكتب
                </label>
                <Field
                    type="text"
                    name="officeName"
                    className={CLASSES.input}
                />
            </div>

            {/* حقل من نحن */}
            <div>
                <label htmlFor="notes" className={CLASSES.label}>
                    من نحن
                </label>
                <Field
                    name="notes"
                    as="textarea"
                    className={`${CLASSES.input} h-[120px] md:h-[178px]`}
                />
            </div>

            {/* حقل الرؤية */}
            <div>
                <label htmlFor="vision" className={CLASSES.label}>
                    الرؤية
                </label>
                <Field
                    name="vision"
                    as="textarea"
                    className={`${CLASSES.input} h-[80px] md:h-[92px]`}
                />
            </div>

            {/* حقل الرسالة */}
            <div>
                <label htmlFor="message" className={CLASSES.label}>
                    الرسالة
                </label>
                <Field
                    name="message"
                    as="textarea"
                    className={`${CLASSES.input} h-[80px] md:h-[92px]`}
                />
            </div>
        </>
    );
};

export default OfficeInfo;
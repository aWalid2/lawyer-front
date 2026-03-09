// components/tasks/TimelineForm.tsx
import { Formik, Form, Field } from 'formik';

interface TimelineFormProps {
    startDate: string;
    endDate: string;
}

const fieldClasses = {
    container: "flex-1",
    label: "block text-sm font-medium text-gray-700 mb-2",
    input: "w-full min-h-[50px] max-sm:min-h-[40px] bg-[#FBFBFB] border border-[#D9D9D9] rounded-lg px-4 py-2 cursor-not-allowed whitespace-normal break-words",
    grid: "grid grid-cols-1 md:grid-cols-2 gap-6"
};

export default function TimelineForm({ startDate, endDate }: TimelineFormProps) {
    return (
        <div className="w-full border border-[#D9D9D9] rounded-2xl mt-8 p-6">
            <h1 className="font-bold text-lg mb-6">الجدول الزمني</h1>
            <Formik
                enableReinitialize={true}
                initialValues={{
                    StartDate: startDate || "",
                    EndDate: endDate || "",
                }}
                onSubmit={(values) => {
                    console.log("Form submitted:", values);
                }}
            >
                {() => (
                    <Form>
                        <div className={fieldClasses.grid}>
                            <div className={fieldClasses.container}>
                                <label className={fieldClasses.label}>تاريخ بداية المهمة</label>
                                <Field
                                    name="StartDate"
                                    type="date"
                                    className={fieldClasses.input}
                                    readOnly
                                />
                            </div>
                            <div className={fieldClasses.container}>
                                <label className={fieldClasses.label}>تاريخ نهاية المهمة</label>
                                <Field
                                    name="EndDate"
                                    type="date"
                                    className={fieldClasses.input}
                                    readOnly
                                />
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
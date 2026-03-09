// components/tasks/TaskDetailsForm.tsx
import { Formik, Form, Field } from 'formik';

interface TaskDetailsFormProps {
    task: {
        TaskType: string;
        PersonInCharge: string;
        DeliveryDate: string;
        status: string;
    };
}

const fieldClasses = {
    container: "flex-1",
    label: "block text-sm font-medium text-gray-700 mb-2",
    input: "w-full min-h-[50px] max-sm:min-h-[40px] bg-[#FBFBFB] border border-[#D9D9D9] rounded-lg px-4 py-2 cursor-not-allowed whitespace-normal break-words",
    grid: "grid grid-cols-1 md:grid-cols-2 gap-6"
};

export default function TaskDetailsForm({ task }: TaskDetailsFormProps) {
    return (
        <div className="w-full border border-[#D9D9D9] rounded-2xl mt-8 p-6">
            <h1 className="font-bold text-lg mb-6">تفاصيل المهمة</h1>
            <Formik
                enableReinitialize={true}
                initialValues={{
                    TaskType: task.TaskType || "",
                    PersonInCharge: task.PersonInCharge || "",
                    DeliveryDate: task.DeliveryDate || "",
                    status: task.status || "",
                }}
                onSubmit={(values) => {
                    console.log("Form submitted:", values);
                }}
            >
                {() => (
                    <Form>
                        <div className={fieldClasses.grid}>
                            <div className={fieldClasses.container}>
                                <label className={fieldClasses.label}>نوع المهمة</label>
                                <Field
                                    name="TaskType"
                                    type="text"
                                    className={fieldClasses.input}
                                    placeholder="نوع المهمة"
                                    readOnly
                                />
                            </div>
                            <div className={fieldClasses.container}>
                                <label className={fieldClasses.label}>المٌكلف</label>
                                <Field
                                    name="PersonInCharge"
                                    type="text"
                                    className={fieldClasses.input}
                                    placeholder="المسؤول"
                                    readOnly
                                />
                            </div>
                            <div className={fieldClasses.container}>
                                <label className={fieldClasses.label}>تاريخ التسليم</label>
                                <Field
                                    name="DeliveryDate"
                                    type="date"
                                    className={fieldClasses.input}
                                    readOnly
                                />
                            </div>
                            <div className={fieldClasses.container}>
                                <label className={fieldClasses.label}>حالة المهمة</label>
                                <Field
                                    name="status"
                                    type="text"
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
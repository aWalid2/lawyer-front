// TaskDetailsForm.tsx
import { InputForm } from '@/shared/components/InputForm';
import { Formik, Form } from 'formik';

interface TaskDetailsFormProps {
    task: {
        TaskType: string;
        PersonInCharge: string;
        DeliveryDate: string;
        status: string;
    };
}

const fieldClasses = {
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
                            <InputForm label='نوع المهمة' type='text' name='TaskType' readonly />
                            <InputForm label='المسؤول عن المهمة' type='text' name='PersonInCharge' readonly />
                            <InputForm label='تاريخ التسليم' type='text' name='DeliveryDate' readonly />
                            <InputForm label='حالة المهمة' type='text' name='status' readonly />
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
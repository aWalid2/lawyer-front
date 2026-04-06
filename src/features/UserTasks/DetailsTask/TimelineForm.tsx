// TimelineForm.tsx
import { InputForm } from '@/shared/components/InputForm';
import { Form, Formik } from 'formik';

interface TimelineFormProps {
    startDate: string;
    endDate: string;
}

const fieldClasses = {
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
                            <InputForm label='تاريخ بداية المهمة' type='text' name='StartDate' readonly />
                            <InputForm label='تاريخ نهاية المهمة' type='text' name='EndDate' readonly />
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
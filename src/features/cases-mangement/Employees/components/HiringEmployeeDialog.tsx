import React from "react";
import { Formik, Form } from "formik";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { XIcon } from "lucide-react";
import { InputForm } from "@/components/shared/components/InputForm";
import * as Yup from "yup";

interface HiringEmployeeDialogProps {
    trigger: React.ReactNode;
}

export const HiringEmployeeDialog: React.FC<HiringEmployeeDialogProps> = ({ trigger }) => {
    const initialValues = {
        name: "",
        phone: "",
        job: "",
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("اسم الموظف مطلوب"),
        phone: Yup.string().required("رقم الهاتف مطلوب"),
        job: Yup.string().required("الوظيفة مطلوبة"),
    });

    return (
        <Dialog>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent
                className="sm:max-w-[500px] flex flex-col sm:px-12 px-6 sm:py-10 py-6 sm:rounded-[24px] rounded-[12px] border-none"
                dir="rtl"
                showCloseButton={false}
            >
                <DialogClose asChild>
                    <button className="absolute top-6 sm:inset-e-8 inset-e-6 text-gray-500 px-6 py-2.5 rounded-[12px] font-semibold flex items-center gap-2 h-12.5 transition-all">
                        <XIcon size={23} className="text-gray-500 " />
                    </button>
                </DialogClose>
                <DialogHeader className="mb-2 mt-4">
                    <DialogTitle className="text-2xl font-bold text-center text-[#153A4D]">
                        تعيين موظف
                    </DialogTitle>
                </DialogHeader>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        console.log("Hiring employee:", values);
                    }}
                >
                    {() => (
                        <Form className="space-y-4">
                            <InputForm
                                name="name"
                                label="اسم الموظف"
                                type="text"
                            />
                            <InputForm
                                name="phone"
                                label="رقم الهاتف"
                                type="text"
                            />
                            <InputForm
                                name="job"
                                label="الوظيفة"
                                type="text"
                            />

                            <button
                                type="submit"
                                className="bg-primary-gradient text-white px-8 py-2.5 w-full mt-4 rounded-[12px] font-bold shadow-lg hover:opacity-90 transition-opacity"
                            >
                                إضافة
                            </button>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
};

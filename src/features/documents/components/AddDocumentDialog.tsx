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
import { Button } from "@/components/ui/button";
import { SelectForm } from "@/components/shared/components/SelectForm";
import { cn } from "@/lib/utils";


export const AddDocumentDialog: React.FC = () => {
    const initialValues = {
        documentType: "",
        autoNumber: "",
        caseNumber: "",
        caseTitle: "",
        uploadFiles: null,
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    className={cn(
                        "h-12.5 px-8 rounded-[12px] flex items-center gap-2 text-sm font-semibold transition-all active:scale-95 whitespace-nowrap",
                        "bg-[#BF9A61] hover:bg-[#A68654] text-white shadow-[0_4px_14px_0_rgba(191,154,97,0.39)]",
                    )}
                >
                    <span className="text-xl">+</span>
                    <span>مستند جديد</span>
                </Button>
            </DialogTrigger>
            <DialogContent
                className="sm:max-w-[634px] max-h-[90vh] overflow-y-auto sm:px-20 px-6 sm:py-10 py-6 sm:rounded-[24px] rounded-[12px] border-none custom-scrollbar"
                dir="rtl"
                showCloseButton={false}
            >
                <DialogClose asChild>
                    <button className="absolute top-8 sm:inset-e-15 inset-e-6 text-gray-500 px-6 py-2.5 rounded-[12px] font-semibold flex items-center gap-2 h-12.5 transition-all">
                        <XIcon size={23} className="text-gray-500 " />
                    </button>
                </DialogClose>
                <DialogHeader className="mb-2 mt-15">
                    <DialogTitle className="text-2xl font-bold text-center text-[#153A4D]">
                        إضافة مستند جديد
                    </DialogTitle>
                </DialogHeader>

                <Formik
                    initialValues={initialValues}
                    onSubmit={(values) => {
                        console.log("Adding contract:", values);
                    }}
                >
                    {() => (
                        <Form className="space-y-4">

                            <SelectForm
                                name="documentType"
                                label="نوع المستند"
                                options={[
                                    { value: "type1", label: "نوع المستند 1" },
                                    { value: "type2", label: "نوع المستند 2" },
                                    { value: "type3", label: "نوع المستند 3" },
                                ]}
                            />

                            <InputForm
                                name="autoNumber"
                                label="الرقم الآلي للقضية"
                                type="text"
                            />

                            <InputForm
                                name="caseNumber"
                                label="كود القضية"
                                type="text"
                            />

                            <InputForm
                                name="caseTitle"
                                label="عنوان القضية"
                                type="text"
                            />

                            <InputForm
                                name="uploadFiles"
                                label="رفع الملفات"
                                type="file"
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

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
import { FileUpload } from "@/components/shared/components/FileUpload";
import { TextAreaForm } from "@/components/shared/components/TextAreaForm";
import { Button } from "@/components/ui/button";
import { SelectForm } from "@/components/shared/components/SelectForm";
import { cn } from "@/lib/utils";


interface AddDocumentDialogProps {
    filter: string;
}

export const AddDocumentDialog: React.FC<AddDocumentDialogProps> = ({ filter }) => {
    const isCases = filter === "cases";

    const initialValues = {
        documentType: isCases ? "case_doc1" : "client_doc1",
        code: isCases ? "1249" : "12143",
        name: isCases ? "قضية" : "محمد احمد",
        details: isCases ? "عقد ايجار مكان" : "01012345678",
        uploadFiles: null,
        notes: isCases ? "ملاحظات قضية" : "ملاحظات موكل",
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
                className="sm:max-w-[715px] max-h-[90vh] overflow-y-auto sm:px-20 px-6 sm:py-10 py-6 sm:rounded-[24px] rounded-[12px] border-none custom-scrollbar"
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
                    enableReinitialize
                    onSubmit={(values) => {
                        console.log("Adding contract:", values);
                    }}
                >
                    {() => (
                        <Form className="space-y-4">

                            <SelectForm
                                name="documentType"
                                label="نوع المستند"
                                options={isCases ? [
                                    { value: "case_doc1", label: "قضية" },
                                    { value: "case_doc2", label: "مستند قضية" },
                                ] : [
                                    { value: "client_doc1", label: " موكل 1" },
                                    { value: "client_doc2", label: "موكل   2" },
                                ]}
                            />

                            <InputForm
                                name="code"
                                label={isCases ? "الرقم الآلي للقضية" : "كود الموكل"}
                                type="text"
                            />

                            <InputForm
                                name="name"
                                label={isCases ? "كود القضية" : "اسم الموكل"}
                                type="text"
                            />

                            <InputForm
                                name="details"
                                label={isCases ? "عنوان القضية" : "رقم الهاتف"}
                                type="text"
                            />

                            <FileUpload
                                name="uploadFiles"
                                label="رفع الملفات"
                            />

                            <TextAreaForm
                                name="notes"
                                label="ملاحظات"
                                placeholder="ملاحظات"
                            />


                            <button
                                type="submit"
                                className="bg-primary-gradient text-white px-8 py-2.5 w-full mt-4 rounded-[12px] font-bold shadow-lg hover:opacity-90 transition-opacity"
                            >
                                إضافة مستند
                            </button>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
};

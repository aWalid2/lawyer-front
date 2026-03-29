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
import { InputForm } from "@/shared/components/InputForm";
import { FileUpload } from "@/shared/components/FileUpload";
import { TextAreaForm } from "@/shared/components/TextAreaForm";
import { HeaderActionButton } from "@/shared/components/HeaderActionButton";
import { SelectForm } from "@/shared/components/SelectForm";


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
                <HeaderActionButton
                    label="مستند جديد"
                    variant="primary"
                    icon={<span className="text-xl">+</span>}
                    iconPosition="left"
                    className="rounded-main h-12.5 px-8"
                />
            </DialogTrigger>
            <DialogContent
                className="sm:max-w-[715px] max-h-[90vh] flex flex-col overflow-hidden sm:px-20 px-6 sm:py-10 py-6 sm:rounded-[24px] rounded-main border-none text-right"
                dir="rtl"
                showCloseButton={false}
            >
                <DialogClose asChild>
                    <button className="absolute top-8 sm:inset-e-15 inset-e-6 text-gray-500 px-6 py-2.5 rounded-main font-semibold flex items-center gap-2 h-12.5 transition-all">
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
                        <Form className="space-y-4 overflow-y-auto custom-scrollbar flex-1 pl-2 pb-2">

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
                                className="bg-primary-gradient text-white px-8 py-2.5 w-full mt-4 rounded-main font-bold shadow-lg hover:opacity-90 transition-opacity"
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

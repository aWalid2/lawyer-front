
import React, { useMemo } from "react";
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
import { SelectForm } from "@/shared/components/SelectForm";
import type { Document } from "../types/types";
import { useFetchCases } from "@/features/UserTasks/api/hooks/useGetCase";
import * as Yup from "yup";
import { useUpdateDocument } from "../api/hooks/useUpdateDocument";

interface EditDocumentDialogProps {
    document: Document;
    trigger: React.ReactNode;
    onDocumentUpdated?: () => void;
}

export const EditDocumentDialog: React.FC<EditDocumentDialogProps> = ({
    document,
    trigger,
    onDocumentUpdated,
}) => {
    const { data: cases, isPending: isCasesLoading } = useFetchCases();
    const { mutate: updateDocument, isPending } = useUpdateDocument();
    const [open, setOpen] = React.useState(false);

    const clientId = localStorage.getItem('clientId') || '';

    const caseOptions = useMemo(() => {
        if (!cases?.data || cases.data.length === 0) return [];
        return cases.data.map((caseItem: any) => ({
            value: String(caseItem.id || caseItem.case_id),
            label: caseItem.case_title
        }));
    }, [cases]);

    // جلب قيمة case_id الحالية من المستند
    const currentCaseValue = useMemo(() => {
        const caseValue = (document as any).case_id || (document as any).case || (document as any).caseId || "";
        return String(caseValue);
    }, [document]);

    const initialValues = {
        document_type: document.document_type || "NOT_CASE_RELATED",
        document_category: document.document_category || "",
        document_name: document.document_name || "",
        document_details: document.document_details || "",
        file: null,
        case: currentCaseValue,
    };

    const validationSchema = Yup.object({
        document_type: Yup.string().required("يرجى اختيار نوع المستند"),
        document_category: Yup.string().when("document_type", {
            is: "NOT_CASE_RELATED",
            then: (schema) => schema.required("نوع المستند مطلوب"),
            otherwise: (schema) => schema.notRequired(),
        }),
        document_name: Yup.string(),
        document_details: Yup.string().required("تفاصيل المستند مطلوبة"),
        case: Yup.string().when("document_type", {
            is: "CASE_RELATED",
            then: (schema) => schema.required("يرجى اختيار القضية"),
            otherwise: (schema) => schema.notRequired(),
        }),
    });

    const handleSubmit = (values: any) => {
        const formData = new FormData();

        formData.append("document_type", values.document_type);
        formData.append("document_details", values.document_details);

        if (values.document_name) {
            formData.append("document_name", values.document_name);
        }

        if (values.document_type === "CASE_RELATED") {
            const caseNumber = Number(values.case);
            if (isNaN(caseNumber)) {
                console.error("Invalid case:", values.case);
                return;
            }
            formData.append("case", String(caseNumber));
            formData.append("document_category", "");
        } else {
            formData.append("document_category", values.document_category);
        }

        if (values.file && values.file instanceof FileList && values.file.length > 0) {
            formData.append("file", values.file[0]);
        }

        updateDocument(
            {
                id: document.id,
                clientId: clientId,
                data: formData
            },
            {
                onSuccess: () => {
                    setOpen(false);
                    if (onDocumentUpdated) onDocumentUpdated();
                },
            }
        );
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent
                className="sm:max-w-[715px] max-h-[90vh] flex flex-col overflow-hidden sm:px-20 px-6 sm:py-10 py-6 sm:rounded-[24px] rounded-main border-none text-right"
                dir="rtl"
                showCloseButton={false}
            >
                <DialogClose asChild>
                    <button className="absolute top-8 sm:inset-e-15 inset-e-6 text-gray-500 px-6 py-2.5 rounded-main font-semibold flex items-center gap-2 h-12.5 transition-all">
                        <XIcon size={23} className="text-gray-500" />
                    </button>
                </DialogClose>
                <DialogHeader className="mb-2 mt-15">
                    <DialogTitle className="text-2xl font-bold text-center text-[#153A4D]">
                        تعديل المستند
                    </DialogTitle>
                </DialogHeader>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    enableReinitialize
                >
                    {({ values }) => (
                        <Form className="space-y-4 overflow-y-auto custom-scrollbar flex-1 pl-2 pb-2">
                            <SelectForm
                                name="document_type"
                                label="اختار نوع المستند"
                                options={[
                                    { value: "CASE_RELATED", label: "المستند تابع للقضايا" },
                                    { value: "NOT_CASE_RELATED", label: "المستند غير تابع للقضايا" },
                                ]}
                            />

                            {values.document_type === "CASE_RELATED" ? (
                                <SelectForm
                                    name="case"
                                    label="اختر القضية"
                                    options={caseOptions}
                                    placeholder={isCasesLoading ? "جاري تحميل القضايا..." : "اختر القضية"}
                                    disabled={isCasesLoading || caseOptions.length === 0}
                                />
                            ) : (
                                <InputForm
                                    name="document_category"
                                    label="نوع المستند"
                                    type="text"
                                    placeholder="أدخل نوع المستند"
                                />
                            )}

                            <InputForm
                                name="document_name"
                                label="اسم المستند"
                                type="text"
                                placeholder="أدخل اسم المستند"
                            />

                            <InputForm
                                name="document_details"
                                label="تفاصيل المستند"
                                type="text"
                                placeholder="أدخل تفاصيل المستند"
                            />

                            <FileUpload
                                name="file"
                                label="رفع الملفات"
                            />

                            <button
                                type="submit"
                                disabled={isPending}
                                className="bg-primary-gradient text-white px-8 py-2.5 w-full mt-4 rounded-main font-bold shadow-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                            >
                                {isPending ? "جاري الحفظ..." : "حفظ التغييرات"}
                            </button>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
};
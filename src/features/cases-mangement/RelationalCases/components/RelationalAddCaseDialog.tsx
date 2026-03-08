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
import { Plus, XIcon } from "lucide-react";
import { InputForm } from "@/components/shared/components/InputForm";
import { Button } from "@/components/ui/button";


export const RelationalAddCaseDialog: React.FC = () => {
    const initialValues = {
        relatedCaseNumber: "",

    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    className="rounded-[12px] h-12.5 px-6 bg-primary-gradient font-semibold text-white flex items-center gap-2"
                >
                    <Plus />
                    إضافة قضية مرتبطة
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
                        إضافة قضية مرتبطة
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

                            <InputForm
                                name="relatedCaseNumber"
                                label="رقم القضية المرتبطة"
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

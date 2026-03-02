import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import close from "../../../../../../../public/images/close.svg";
import FormEdit from "./FormEdit";

interface EditClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  clientData?: any;
  onSave?: (values: any) => void;
}

const validationSchema = Yup.object().shape({
  clientType: Yup.string().required("مطلوب"),
  name: Yup.string().required("مطلوب"),
  nationalId: Yup.string().required("مطلوب"),
  phone: Yup.string().required("مطلوب"),
  email: Yup.string().email("بريد غير صالح").required("مطلوب"),
  nationality: Yup.string().required("مطلوب"),
  country: Yup.string().required("مطلوب"),
  address: Yup.string().required("مطلوب"),
});

export function EditClientModal({
  isOpen,
  onClose,
  clientData,
  onSave,
}: EditClientModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0  bg-black/50 grid  place-items-center p-3 sm:p-6 "

    >
      <div
        dir="rtl"
        className="
          w-full 
          max-w-[95%] sm:max-w-[90%] md:max-w- lg:max-w-3xl xl:max-w-4xl
          my-2 sm:my-4 md:my-6
          rounded-lg bg-white shadow-xl
          flex flex-col
          mx-auto
          relative
          max-h-[98dvh] sm:max-h-[95dvh] md:max-h-[90dvh]
          overflow-y-auto
          
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative flex-shrink-0 px-3 sm:px-4 md:px-6 py-2 sm:py-3  rounded-2xl sm:rounded-tl-3xl">
          <button
            onClick={onClose}
            className="absolute pt-6 px-[40px] left-2 sm:left-4 md:left-6 top-2 sm:top-3 text-gray-400 hover:text-gray-600 transition-colors"
            type="button"
          >
            <img
              src={close}
              alt="close"
              className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
            />
          </button>

          <h2 className="text-center pt-[80px] mb-6 text-xs sm:text-sm md:text-base lg:text-lg font-bold text-[#153A4D]">
            تعديل بيانات الموكل
          </h2>
        </div>

        {/* Body */}
        <div className="flex-grow  px-3 sm:px-4 md:px-6 py-3 sm:py-4">
          <Formik
            initialValues={{
              clientType: clientData?.clientType || "شركات",
              name: clientData?.name || "",
              nationalId: clientData?.nationalId || "019389384",
              phone: clientData?.phone || "5xxxxxxxx",
              email: clientData?.email || "example@gmail.com",
              nationality: clientData?.nationality || "سعودي",
              country: clientData?.country || "المملكة العربية السعودية",
              address: clientData?.address || "05 Oct 2026",
              photo: null,
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              onSave?.(values);
              onClose();
            }}
            enableReinitialize
          >
            {({ errors, touched, isSubmitting }) => (
              <FormEdit errors={errors} touched={touched} isSubmitting={isSubmitting} />
            )}
          </Formik>
        </div>
      </div>
    </div>,
    document.body
  );
}
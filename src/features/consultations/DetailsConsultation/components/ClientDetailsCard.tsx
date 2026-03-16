import React from "react";
import { Formik, Form } from "formik";
import { InputForm } from "@/components/shared/components/InputForm";
import type { Consultation } from "../../MainConsultations/types";
import { CardLayout } from "./CardLayout";

interface ClientDetailsCardProps {
  consultation: Consultation;
}

export const ClientDetailsCard: React.FC<ClientDetailsCardProps> = ({ consultation }) => {
  return (
    <CardLayout>
      <h3 className="text-lg font-bold text-secondary mb-4">تفاصيل الموكل</h3>

      <Formik
        initialValues={{
          clientName: consultation.clientName,
          clientNationalId: consultation.clientNationalId || "245897458",
          clientEmail: consultation.clientEmail || "info@aldawli-law.com",
          clientPhone: consultation.clientPhone || "+965 2296 5000",
        }}
        onSubmit={() => { }}
      >
        <Form className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <InputForm
            name="clientName"
            label="الاسم"
            type="text"
            readonly
          />
          <InputForm
            name="clientNationalId"
            label="الرقم الوطني"
            type="text"
            readonly
          />
          <InputForm
            name="clientEmail"
            label="البريد الإلكتروني"
            type="text"
            readonly
          />
          <InputForm
            name="clientPhone"
            label="رقم الهاتف"
            type="text"
            readonly
          />
        </Form>
      </Formik>
    </CardLayout>
  );
};

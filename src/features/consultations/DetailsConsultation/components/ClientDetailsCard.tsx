import React from "react";
import { Formik, Form } from "formik";
import { InputForm } from "@/shared/components/InputForm";
import { CardLayout } from "./CardLayout";

interface ClientDetailsCardProps {
  consultation: any;
}

export const ClientDetailsCard: React.FC<ClientDetailsCardProps> = ({ consultation }) => {
  // Get client details from the client object
  const client = consultation.client || {};
  
  const initialValues = {
    clientName: client.first_name ? `${client.first_name} ${client.last_name || ''}`.trim() : "غير محدد",
    clientNationalId: client.ssn || "غير محدد",
    clientEmail: client.email || "غير محدد",
    clientPhone: client.phone || "غير محدد",
    clientNationality: client.nationality || "غير محدد",
    clientAddress: client.address || "غير محدد",
  };

  return (
    <CardLayout>
      <h3 className="text-lg font-bold text-secondary mb-4">تفاصيل الموكل</h3>

      <Formik initialValues={initialValues} onSubmit={() => {}}>
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
import React from "react";
import { Formik, Form } from "formik";
import { EditIcon } from "@/shared/icons/Edit";
import { LayoutDialog } from "@/shared/components/LayoutDialog";
import { InputForm } from "../../../../../shared/components/InputForm";
import { SelectForm } from "../../../../../shared/components/SelectForm";
import type { CaseFormValues } from "./components/typesCaseInfo";
import { useGetCaseInfo } from "../../api/hooks/useGetCaseInfo";
import { useParams } from "react-router-dom";
import { useGetCaseStatus } from "@/features/cases-mangement/api/hooks/useGetCaseStatus";
import { useFetchClients } from "@/shared/api/hooks/useGetClients";
import { useGetCaseType } from "@/features/cases-mangement/api/hooks/useGetCaseType";
import { useUpdateCase } from "@/features/cases-mangement/MainCases/api/hooks/useUpdateCase";
import { SubmitButton } from "@/shared/components/SubmitButton";
import { TextAreaForm } from "@/shared/components/TextAreaForm";

import {
  CASE_SITUATION_OPTIONS,
  CASE_TITLE_OPTIONS,
  LITIGATION_LEVEL_OPTIONS,
} from "@/shared/constants/caseOptions";

export const FormCaseDialog: React.FC = () => {
  const { id } = useParams();
  const { data: caseInfo } = useGetCaseInfo(id!) || {};
  const [open, setOpen] = React.useState(false);
  const { data: caseStatus } = useGetCaseStatus(open);
  const { data: clients } = useFetchClients(
    undefined,
    undefined,
    undefined,
    open,
  );
  const { data: caseTypes } = useGetCaseType(open);
  const { mutateAsync: updateCase, isPending } = useUpdateCase();

  const caseStatusOptions =
    caseStatus?.data?.map((status: any) => ({
      label: status.name,
      value: String(status.id),
    })) || [];

  const clientNameOptions =
    clients?.data?.map((client: any) => ({
      label: client.name,
      value: String(client.user_id),
    })) || [];

  const caseTypeOptions =
    caseTypes?.data?.map((type: any) => ({
      label: type.name,
      value: String(type.id),
    })) || [];

  const initialValues: CaseFormValues = {
    case_sequence: caseInfo?.case_sequence || "",
    Complaint_Number: caseInfo?.Complaint_Number || "",
    client_id: caseInfo?.client?.id || "",
    case_title: caseInfo?.case_title || "",
    case_status_id: caseInfo?.caseStatus?.id || "",
    Current_court_degree: caseInfo?.Current_court_degree || "",
    case_type_id: caseInfo?.case_type?.id || "",
    client_type: caseInfo?.client_type || "",
    case_situation: caseInfo?.case_situation || "",
    created_at: caseInfo?.created_at || "",
    case_entry_date: caseInfo?.case_entry_date || "",
    notes: caseInfo?.notes || "",
  };

  return (
    <LayoutDialog
      title="تعديل معلومات القضية"
      trigger={
        <button
          type="button"
          className="bg-primary-gradient flex h-12.5 items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90"
        >
          <EditIcon />
          تعديل
        </button>
      }
      open={open}
      onOpenChange={setOpen}
    >
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const payload = {
              ...values,
              client_id: values.client_id
                ? Number(values.client_id)
                : undefined,
              case_type_id: values.case_type_id
                ? Number(values.case_type_id)
                : undefined,
              case_status_id: values.case_status_id
                ? Number(values.case_status_id)
                : undefined,
            };
            await updateCase({ id: id!, data: payload as any });
            setOpen(false);
          } catch (error) {
            console.error(error);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {() => (
          <Form className="custom-scrollbar flex-1 space-y-4 overflow-y-auto pb-2 pl-2">
            <div className="grid grid-cols-1 gap-x-4 gap-y-4 md:grid-cols-2">
              <InputForm name="case_sequence" label="كود القضية" type="text" />
              <InputForm
                name="Complaint_Number"
                label="الرقم الآلي للقضية"
                type="text"
              />

              <SelectForm
                name="client_id"
                label="اسم الموكل"
                options={clientNameOptions}
              />
              <SelectForm
                name="case_title"
                label="صفة الموكل"
                options={CASE_TITLE_OPTIONS}
              />

              <SelectForm
                name="case_type_id"
                label="نوع القضية"
                options={caseTypeOptions}
              />
              <SelectForm
                name="case_status_id"
                label="حالة القضية"
                options={caseStatusOptions}
              />
              <SelectForm
                name="case_situation"
                label="وضع القضية عند الاستلام"
                options={CASE_SITUATION_OPTIONS}
              />
              <SelectForm
                name="Current_court_degree"
                label="درجة التقاضي"
                options={LITIGATION_LEVEL_OPTIONS}
              />

              <InputForm
                name="created_at"
                label="تاريخ إنشاء القضية"
                type="date"
              />

              <InputForm
                name="case_entry_date"
                label="تاريخ ورود القضية في المكتب"
                type="date"
              />

              <TextAreaForm
                className="md:col-span-2"
                name="notes"
                label="ملاحظات"
              />
            </div>
            <SubmitButton
              isPending={isPending}
              loadingText="جاري التعديل..."
              className="mt-6"
            >
              حفظ التغييرات
            </SubmitButton>
          </Form>
        )}
      </Formik>
    </LayoutDialog>
  );
};

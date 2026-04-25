import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SelectForm } from "@/shared/components/SelectForm";
import { Form, Formik } from "formik";
import { XIcon } from "lucide-react";
import React from "react";
import { useGetCases } from "../../MainCases/api/hooks/useGetCases";
import { useCreateRelatedCase } from "../api/hooks/useCreateRelatedCase";
import { useUpdateRelatedCase } from "../api/hooks/useUpdateRelatedCase";
import type { RelatedCaseTableItem } from "../types";

interface RelationalCaseDialogProps {
  trigger: React.ReactNode;
  title: string;
  caseId: string;
  caseItem?: RelatedCaseTableItem;
}

export const RelationalCaseDialog: React.FC<RelationalCaseDialogProps> = ({
  trigger,
  title,
  caseId,
  caseItem,
}) => {
  const [open, setOpen] = React.useState(false);
  const { data: cases = [] } = useGetCases();
  const casesOptions = cases?.data?.map(
    (caseData: { id: number; case_sequence: string }) => ({
      label: `${caseData.case_sequence}`,
      value: String(caseData.id),
    }),
  );

  const { mutateAsync: createRelatedCase } = useCreateRelatedCase();
  const { mutateAsync: updateRelatedCase } = useUpdateRelatedCase();
  const isEditing = Boolean(caseItem);

  const initialValues = {
    relatedCaseId: caseItem ? String(caseItem.id) : "",
  };


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        className="custom-scrollbar max-h-[90vh] overflow-y-auto rounded-[12px] border-none px-6 py-6 sm:max-w-158.5 sm:rounded-[24px] sm:px-20 sm:py-10"
        dir="rtl"
        showCloseButton={false}
      >
        <DialogClose asChild>
          <button className="absolute inset-e-6 top-8 flex h-12.5 items-center gap-2 rounded-[12px] px-6 py-2.5 font-semibold text-gray-500 transition-all sm:inset-e-15">
            <XIcon size={23} className="text-gray-500" />
          </button>
        </DialogClose>
        <DialogHeader className="mt-15 mb-2">
          <DialogTitle className="text-center text-2xl font-bold text-[#153A4D]">
            {title}
          </DialogTitle>
        </DialogHeader>


        <Formik
          initialValues={initialValues}
          enableReinitialize
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const relatedCaseId = Number(values.relatedCaseId.trim());

              if (isEditing && caseItem) {
                await updateRelatedCase({
                  caseId,
                  relatedCaseId: String(caseItem?.id),
                  related_case_id: String(relatedCaseId),
                });
              } else {
                await createRelatedCase({
                  caseId,
                  related_case_id: relatedCaseId,
                });
              }

              setOpen(false);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <SelectForm
                name="relatedCaseId"
                label="اختر القضية المرتبطة"
                options={casesOptions}
                showSearch
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-primary-gradient mt-4 w-full rounded-main px-8 py-2.5 font-bold text-white shadow-lg transition-opacity hover:opacity-90 disabled:opacity-70"
              >
                {isEditing ? "تعديل" : "إضافة"}
              </button>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

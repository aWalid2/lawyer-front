import React from "react";
import { LayoutDialog } from "@/shared/components/LayoutDialog";
import type {
  ExpertSessionRequest,
  ExpertSessionStatus,
} from "../../../types/ExpertSessionApiTypes";
import { AddExpertModalForm } from "./AddExpertModal/AddExpertModalForm";

interface AddExpertModalProps {
  onClose: () => void;
  onSave: (values: ExpertSessionRequest) => Promise<void>;
  isPending?: boolean;
  initialValues?: Partial<ExpertSessionRequest>;
}

const AddExpertModal: React.FC<AddExpertModalProps> = ({
  onClose,
  onSave,
  isPending = false,
  initialValues,
}) => {
  const defaultValues: ExpertSessionRequest = {
    expert_report_number: initialValues?.expert_report_number || "",
    assigning_authority: initialValues?.assigning_authority || "",
    assignment_date: initialValues?.assignment_date || "",
    expert_office_name: initialValues?.expert_office_name || "",
    task_start_date: initialValues?.task_start_date || "",
    subject_of_expertise: initialValues?.subject_of_expertise || "",
    final_opinion: initialValues?.final_opinion || "",
    submission_date: initialValues?.submission_date || "",
    status: (initialValues?.status as ExpertSessionStatus) || "UNDER_REVIEW",
  };
  const isEditMode = !!initialValues;

  return (
    <LayoutDialog
      title={isEditMode ? "تعديل بيانات الخبير" : "إضافة خبير جديد"}
      open={true}
      onOpenChange={onClose}
      size="lg"
      padding="wide"
    >
      <AddExpertModalForm
        defaultValues={defaultValues}
        isEditMode={isEditMode}
        isPending={isPending}
        onSubmit={async (values) => {
          await onSave(values);
          onClose();
        }}
      />
    </LayoutDialog>
  );
};

export default AddExpertModal;

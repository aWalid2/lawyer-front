import React from "react";
import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";
import { XIcon } from "lucide-react";
import type {
  ExpertSessionRequest,
  ExpertSessionStatus,
} from "../../../types/ExpertSessionApiTypes";
import { AddExpertModalForm } from "./AddExpertModal/AddExpertModalForm";
import { AddExpertModalHeader } from "./AddExpertModal/AddExpertModalHeader";

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
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent
        className="flex max-h-[90vh] flex-col overflow-hidden rounded-[12px] border-none px-6 py-6 sm:max-w-178.75 sm:rounded-[24px] sm:px-20 sm:py-10"
        dir="rtl"
        showCloseButton={false}
      >
        <DialogClose asChild onClick={onClose}>
          <button className="absolute inset-e-6 top-8 flex h-12.5 items-center gap-2 rounded-[12px] px-6 py-2.5 font-semibold text-gray-500 transition-all sm:inset-e-15">
            <XIcon size={23} className="text-gray-500" />
          </button>
        </DialogClose>
        <AddExpertModalHeader isEditMode={isEditMode} />
        <AddExpertModalForm
          defaultValues={defaultValues}
          isEditMode={isEditMode}
          isPending={isPending}
          onSubmit={async (values) => {
            await onSave(values);
            onClose();
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddExpertModal;

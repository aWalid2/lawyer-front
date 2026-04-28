import { useFetchLawyers } from "@/features/users/users-lawyers/api/hooks/useLawyersGet";
import { LayoutDialog } from "@/shared/components/LayoutDialog";
import LoadingPage from "@/shared/components/LoadingPage";
import React from "react";
import { useGetProcedure } from "../../../../api/hooks/useGetProcedure";
import {
  EMPTY_PROCEDURE_FORM_VALUES,
  toProcedureFormValues,
  type Procedure,
  type ProcedureFormValues,
} from "../../../../types";
import { AddProcedureDialogForm } from "./components/AddProcedureDialogForm";

interface LawyerOptionSource {
  user_id?: number | string;
  user?: {
    first_name?: string;
  };
}

interface LawyersResponse {
  data?: LawyerOptionSource[];
}

interface AddProcedureDialogProps {
  onSave: (values: ProcedureFormValues, id?: number) => Promise<void> | void;
  initialValues?: Partial<Procedure> | null;
  procedureId?: number | string;
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  isPending?: boolean;
}

export const AddProcedureDialog: React.FC<AddProcedureDialogProps> = ({
  trigger,
  onSave,
  initialValues,
  procedureId,
  open,
  onOpenChange,
  isPending = false,
}) => {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const isControlled = typeof open === "boolean";
  const dialogOpen = isControlled ? open : internalOpen;

  const handleOpenChange = (nextOpen: boolean) => {
    if (!isControlled) {
      setInternalOpen(nextOpen);
    }
    onOpenChange?.(nextOpen);
  };

  const shouldFetchDetails = dialogOpen && !!procedureId && !initialValues;
  const { data: procedureDetails, isPending: isLoadingDetails } =
    useGetProcedure(procedureId, shouldFetchDetails);
  const showLoadingState = shouldFetchDetails && isLoadingDetails;
  const { data: lawyersResponse } = useFetchLawyers(dialogOpen);

  const lawyers = Array.isArray(lawyersResponse)
    ? lawyersResponse
    : (lawyersResponse as LawyersResponse | undefined)?.data || [];

  const lawyersOptions = lawyers.map((lawyer: LawyerOptionSource) => ({
    value: String(lawyer?.user_id),
    label: `${lawyer?.user?.first_name || ""} `,
  }));

  const resolvedProcedure = procedureDetails ?? initialValues ?? null;
  const defaultValues: ProcedureFormValues = resolvedProcedure
    ? toProcedureFormValues(resolvedProcedure)
    : EMPTY_PROCEDURE_FORM_VALUES;

  const isEditMode = !!(procedureId || initialValues?.id);

  return (
    <LayoutDialog
      title={isEditMode ? "تعديل الإجراء" : "إضافة إجراء"}
      trigger={trigger}
      open={dialogOpen}
      onOpenChange={handleOpenChange}
      size="xl"
      padding="wide"
    >
      {showLoadingState ? (
        <LoadingPage />
      ) : (
        <AddProcedureDialogForm
          defaultValues={defaultValues}
          isEditMode={isEditMode}
          isPending={isPending}
          lawyersOptions={lawyersOptions}
          onSubmit={async (values) => {
            await onSave(values, resolvedProcedure?.id);
            handleOpenChange(false);
          }}
        />
      )}
    </LayoutDialog>
  );
};

import { useFetchLawyers } from "@/features/users/users-lawyers/api/hooks/useLawyersGet";
import { LayoutDialog } from "@/shared/components/LayoutDialog";
import LoadingPage from "@/shared/components/LoadingPage";
import React from "react";
import { useGetOtherSession } from "../../../../api/hooks/useGetOtherSession";
import {
  EMPTY_OTHER_SESSION_FORM_VALUES,
  type OtherSession,
  type OtherSessionFormValues,
  toOtherSessionFormValues,
} from "../../../../types/typesOther";
import { AddOtherSessionDialogForm } from "./components/AddOtherSessionDialogForm";

interface LawyerOptionSource {
  user_id?: number | string;
  user?: {
    first_name?: string;
  };
}

interface LawyersResponse {
  data?: LawyerOptionSource[];
}

interface AddOtherSessionDialogProps {
  onSave: (values: OtherSessionFormValues, id?: number) => Promise<void> | void;
  initialValues?: Partial<OtherSession> | null;
  sessionId?: number | string;
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  isPending?: boolean;
}

export const AddOtherSessionDialog: React.FC<AddOtherSessionDialogProps> = ({
  trigger,
  onSave,
  initialValues,
  sessionId,
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

  const shouldFetchDetails = dialogOpen && !!sessionId && !initialValues;
  const { data: sessionDetails, isPending: isLoadingDetails } =
    useGetOtherSession(sessionId, shouldFetchDetails);
  const showLoadingState = shouldFetchDetails && isLoadingDetails;
  const { data: lawyersResponse } = useFetchLawyers(dialogOpen);

  const lawyers = Array.isArray(lawyersResponse)
    ? lawyersResponse
    : (lawyersResponse as LawyersResponse | undefined)?.data || [];

  const lawyersOptions = lawyers.map((lawyer: LawyerOptionSource) => ({
    value: String(lawyer?.user_id),
    label: `${lawyer?.user?.first_name || ""} `,
  }));

  const resolvedSession = sessionDetails ?? initialValues ?? null;
  const defaultValues: OtherSessionFormValues = resolvedSession
    ? toOtherSessionFormValues(resolvedSession)
    : EMPTY_OTHER_SESSION_FORM_VALUES;

  const isEditMode = !!(sessionId || initialValues?.id);

  return (
    <LayoutDialog
      title={isEditMode ? "تعديل الجلسة الإدارية" : "إضافة جلسة إدارية"}
      trigger={trigger}
      open={dialogOpen}
      onOpenChange={handleOpenChange}
      size="xl"
      padding="sm"
    >
      {showLoadingState ? (
        <LoadingPage />
      ) : (
        <AddOtherSessionDialogForm
          defaultValues={defaultValues}
          isEditMode={isEditMode}
          isPending={isPending}
          lawyersOptions={lawyersOptions}
          onSubmit={async (values) => {
            await onSave(values, resolvedSession?.id);
            handleOpenChange(false);
          }}
        />
      )}
    </LayoutDialog>
  );
};

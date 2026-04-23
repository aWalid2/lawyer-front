import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useFetchLawyers } from "@/features/users/users-lawyers/api/hooks/useLawyersGet";
import LoadingPage from "@/shared/components/LoadingPage";
import { XIcon } from "lucide-react";
import React from "react";
import { useGetOtherSession } from "../../../../api/hooks/useGetOtherSession";
import {
  EMPTY_OTHER_SESSION_FORM_VALUES,
  type OtherSession,
  type OtherSessionFormValues,
  toOtherSessionFormValues,
} from "../../../../types/typesOther";
import { AddOtherSessionDialogForm } from "./components/AddOtherSessionDialogForm";
import { AddOtherSessionDialogHeader } from "./components/AddOtherSessionDialogHeader";

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
    <Dialog open={dialogOpen} onOpenChange={handleOpenChange}>
      {trigger ? <DialogTrigger asChild>{trigger}</DialogTrigger> : null}
      <DialogContent
        className="flex max-h-[90vh] flex-col overflow-hidden rounded-xl border-none px-6 py-6 sm:max-w-193 sm:rounded-[24px] sm:px-20 sm:py-10"
        dir="rtl"
        showCloseButton={false}
      >
        <DialogClose asChild>
          <button className="absolute inset-e-6 top-8 flex h-12.5 items-center gap-2 rounded-xl px-6 py-2.5 font-semibold text-gray-500 transition-all sm:inset-e-15">
            <XIcon size={23} className="text-gray-500" />
          </button>
        </DialogClose>
        <AddOtherSessionDialogHeader isEditMode={isEditMode} />

        {showLoadingState ? (
          <div className="custom-scrollbar min-h-0 flex-1 overflow-y-auto pb-2 pl-2">
            <LoadingPage />
          </div>
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
      </DialogContent>
    </Dialog>
  );
};

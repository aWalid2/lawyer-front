import LoadingPage from "@/shared/components/LoadingPage";
import { Error } from "@/shared/components/Error";
import { ButtonUpdateInfo } from "@/shared/components/ButtonUpdateInfo";
import { LayoutDialog } from "@/shared/components/LayoutDialog";
import React from "react";
import { useGetExpertSession } from "../../../../api/hooks/useGetExpertSession";
import { MainInfoSection } from "./components/MainInfoSection";

import { OpinionSection } from "./components/OpinionSection";

interface ExpertSessionDetailsDialogProps {
  sessionId: string | number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit?: () => void;
}

export const ExpertSessionDetailsDialog: React.FC<
  ExpertSessionDetailsDialogProps
> = ({ sessionId, open, onOpenChange, onEdit }) => {
  const {
    data: session,
    isPending,
    isError,
    error,
  } = useGetExpertSession(sessionId, open);

  const handleEdit = () => {
    onOpenChange(false);
    onEdit?.();
  };

  return (
    <LayoutDialog
      title="تفاصيل جلسة الخبير"
      open={open}
      onOpenChange={onOpenChange}
      size="xl"
      padding="sm"
    >
      <div className="mb-6 flex justify-end">
        <ButtonUpdateInfo onEdit={handleEdit} />
      </div>

      {isPending ? (
        <LoadingPage />
      ) : isError || !session ? (
        <Error message="حدث خطأ أثناء جلب تفاصيل جلسة الخبير." error={error} />
      ) : (
        <div className="space-y-6">
          <MainInfoSection expert={session} />
          <OpinionSection
            subjectOfExpertise={session.subject_of_expertise}
            finalOpinion={session.final_opinion}
          />
        </div>
      )}
    </LayoutDialog>
  );
};

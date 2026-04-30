import React from "react";
import { HeaderTitle } from "@/shared/components/HeaderTitle";
import { HeaderActionButton } from "@/shared/components/HeaderActionButton";

interface HeaderCaseDocumentsProps {
  title: string;
  buttonText: string;
  action?: React.ReactNode;
  onAddClick?: () => void;
}

export const HeaderCaseDocuments: React.FC<HeaderCaseDocumentsProps> = ({
  title,
  buttonText,
  action,
  onAddClick,
}) => {
  return (
    <div className="mb-6 flex items-center justify-between">
      <HeaderTitle title={title} to="/dashboard/case-management" />

      {action || (
        <HeaderActionButton
          label={buttonText}
          variant="primary"
          icon={<span className="text-xl">+</span>}
          iconPosition="left"
          className="rounded-main h-12.5 px-8"
          onClick={onAddClick}
        />
      )}
    </div>
  );
};

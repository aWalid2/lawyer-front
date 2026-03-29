import React from "react";
import { HeaderTitle } from "@/shared/components/HeaderTitle";


interface HeaderCaseDocumentsProps {
  title: string;
  buttonText: string;
  onAddClick?: () => void;
}

export const HeaderCaseDocuments: React.FC<HeaderCaseDocumentsProps> = ({
  title,
}) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <HeaderTitle title={title} to="/dashboard/case-management" />
    </div>
  );
};

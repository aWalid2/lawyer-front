import React from "react";
import { CaseStatusesFeature } from "@/features/settings/case-statuses";

const CaseStatuses: React.FC = () => {
  return (
    <div className="p-6">
      <CaseStatusesFeature />
    </div>
  );
};

export default CaseStatuses;

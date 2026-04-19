import { useState } from "react";
import { CaseSidebar } from "@/features/cases-mangement/CaseSidebar";
import { Outlet } from "react-router-dom";

const CaseDetails = () => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="flex flex-col xl:flex-row gap-6 w-full min-h-screen mt-6">
      <div className="w-full xl:w-fit">
        <CaseSidebar />
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        <Outlet context={{ isEditing, setIsEditing }} />
      </div>
    </div>
  );
};

export default CaseDetails;

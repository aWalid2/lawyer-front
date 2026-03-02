import { useState } from "react";
import { CaseSidebar } from "@/features/cases-mangement/CaseSidebar";
import { Outlet } from "react-router-dom";

const CaseDetails = () => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full min-h-screen mt-6">
      <div className="w-full lg:w-fit">
        <CaseSidebar />
      </div>

      <div className="flex-1">
        <Outlet context={{ isEditing, setIsEditing }} />
      </div>
    </div>
  );
};

export default CaseDetails;

import React from "react";
import { OtherSessionsDataSection } from "./components/OtherSessionsDataSection";
import { OtherSessionsTable } from "./components/OtherSessionsTable";

const OtherSessions: React.FC = () => {
  return (
    <div className="w-full space-y-6">
      <OtherSessionsDataSection />
      <OtherSessionsTable />
    </div>
  );
};

export default OtherSessions;

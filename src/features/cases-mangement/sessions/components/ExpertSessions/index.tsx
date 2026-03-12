import React from "react";
import { ExpertSessionsDataSection } from "./components/ExpertSessionsDataSection";
import { ExpertSessionsTable } from "./components/ExpertSessionsTable";

const ExpertSessions: React.FC = () => {
  return (
    <div className="space-y-6">
      <ExpertSessionsDataSection />
      <ExpertSessionsTable />
    </div>
  );
};

export default ExpertSessions;

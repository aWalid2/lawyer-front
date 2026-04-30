import React from "react";
import { ExpertsSessionInfo } from "./components/ExpertsSessionInfo";
import { TableExpertsSessions } from "./components/TableExpertsSessions";
const ExpertSessions: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <ExpertsSessionInfo />
      <TableExpertsSessions />
    </div>
  );
};

export default ExpertSessions;

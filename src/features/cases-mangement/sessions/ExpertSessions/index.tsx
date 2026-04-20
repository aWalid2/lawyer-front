import React from "react";
import { ExpertsSessionInfo } from "./components/ExpertsSessionInfo";
import { TableExpertsSessions } from "./components/TableExpertsSessions";
const ExpertSessions: React.FC = () => {
  return (
    <>
      <ExpertsSessionInfo />
      <TableExpertsSessions />
    </>
  );
};

export default ExpertSessions;

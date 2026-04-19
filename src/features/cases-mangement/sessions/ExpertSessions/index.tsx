import React from "react";
import { ExpertsSessionInfo } from "./components/ExpertsSessionInfo";
import { TableExpert } from "./components/TableExpert";
const ExpertSessions: React.FC = () => {
  return (
    <>
      <ExpertsSessionInfo />
      <TableExpert />
    </>
  );
};

export default ExpertSessions;

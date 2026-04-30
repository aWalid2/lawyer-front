import React from "react";
import { ProceduresDataSection } from "./components/ProceduresDataSection";
import { ProceduresTable } from "./components/ProceduresTable";

export const Procedures: React.FC = () => {
  return (
    <div className="w-full space-y-6">
      <ProceduresDataSection />
      <ProceduresTable />
    </div>
  );
};

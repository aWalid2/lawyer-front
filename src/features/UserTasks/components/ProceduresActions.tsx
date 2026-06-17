import { ButtonDeleteTable } from "@/shared/components/buttons/ButtonDeleteTable";
import { ButtonUpdateTable } from "@/shared/components/buttons/ButtonUpdateTable";
import { ViewLinkTablePageDetails } from "@/shared/components/links/ViewLinkTablePageDetails";
import React from "react";

interface ProceduresActionsProps {
  procedure: any;
}

export const ProceduresActions: React.FC<ProceduresActionsProps> = ({
  procedure,
}) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <ViewLinkTablePageDetails to={`/procedures/${procedure.id}`} />
      <ButtonUpdateTable onClick={() => {}} />
      <ButtonDeleteTable onClick={() => {}} />
    </div>
  );
};

import React from "react";
import { TableEditButton } from "@/shared/components/TableEditButton";
import { TableDeleteButton } from "@/shared/components/TableDeleteButton";
import { DistrictFormDialog } from "./DistrictFormDialog";
import type { court_sessions } from "../types/courtTypes";

interface DistrictsActionProps {
  district: court_sessions;
  onUpdate: (id: number, values: { name: string }) => void;
  onDelete: (id: number) => void;
}

export const DistrictsAction: React.FC<DistrictsActionProps> = ({
  district,
  onUpdate,
  onDelete,
}) => {
  return (
    <div className="flex items-center gap-2 justify-center">
      <DistrictFormDialog
        district={district}
        onSave={(values) => onUpdate(Number(district.id), values)}
        trigger={<TableEditButton />}
      />
      <TableDeleteButton onClick={() => onDelete(Number(district.id))} />
    </div>
  );
};

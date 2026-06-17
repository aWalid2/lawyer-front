import React from "react";
import { TableEditButton } from "@/shared/components/buttons/TableEditButton";
import { TableDeleteButton } from "@/shared/components/buttons/TableDeleteButton";
import { DistrictFormDialog } from "./DistrictFormDialog";
import type { court_circle } from "../types/courtTypes";

interface DistrictsActionProps {
  district: court_circle;
  onUpdate: (id: number, values: { name: string }) => void;
  onDelete: (id: number) => void;
}

export const DistrictsAction: React.FC<DistrictsActionProps> = ({
  district,
  onUpdate,
  onDelete,
}) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <DistrictFormDialog
        district={district}
        onSave={(values) => {
          onUpdate(Number(district.id), values);
        }}
        trigger={<TableEditButton />}
      />
      <TableDeleteButton onClick={() => onDelete(Number(district.id))} />
    </div>
  );
};

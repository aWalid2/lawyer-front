import React from "react";
import { TableEditButton } from "@/shared/components/TableEditButton";
import { TableDeleteButton } from "@/shared/components/TableDeleteButton";
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
  console.log(district)
  return (
    <div className="flex items-center gap-2 justify-center">
      <DistrictFormDialog
        district={district}
        onSave={(values) => {

          onUpdate(Number(district.id), values)
        }}
        trigger={<TableEditButton />}
      />
      <TableDeleteButton onClick={() => onDelete(Number(district.id))} />
    </div>
  );
};

import React from "react";
import { TableEditButton } from "@/components/shared/components/TableEditButton";
import { TableDeleteButton } from "@/components/shared/components/TableDeleteButton";
import { DistrictFormDialog } from "./DistrictFormDialog";
import type { DistrictT } from "../types";

interface DistrictsActionProps {
  district: DistrictT;
  onUpdate: (id: string, values: { name: string }) => void;
  onDelete: (id: string) => void;
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
        onSave={(values) => onUpdate(district.id, values)}
        trigger={<TableEditButton />}
      />
      <TableDeleteButton onClick={() => onDelete(district.id)} />
    </div>
  );
};

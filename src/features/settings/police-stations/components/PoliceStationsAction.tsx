import React from "react";
import { TableEditButton } from "@/shared/components/TableEditButton";
import { TableDeleteButton } from "@/shared/components/TableDeleteButton";
import { ConfirmDeleteDialog } from "@/shared/components/ConfirmDeleteDialog";
import { PoliceStationFormDialog } from "./PoliceStationFormDialog";
import type { PoliceStationT } from "../types";

interface PoliceStationsActionProps {
  station: PoliceStationT;
  onUpdate: (id: string, values: Partial<PoliceStationT>) => void;
  onDelete: (id: string) => void;
}

export const PoliceStationsAction: React.FC<PoliceStationsActionProps> = ({
  station,
  onUpdate,
  onDelete,
}) => {
  return (
    <div className="flex items-center gap-2 justify-center">
      <PoliceStationFormDialog
        station={station}
        onSave={(values) => onUpdate(station.id, values)}
        trigger={<TableEditButton />}
      />
      <ConfirmDeleteDialog
        title="حذف المخفر"
        description={`هل أنت متأكد من حذف المخفر "${station.name}"؟`}
        onConfirm={() => onDelete(station.id)}
        trigger={<TableDeleteButton />}
      />
    </div>
  );
};

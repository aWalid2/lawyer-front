import { ButtonDeleteTable } from "@/shared/components/ButtonDeleteTable";
import { ButtonUpdateTable } from "@/shared/components/ButtonUpdateTable";
import { ConfirmDeleteDialog } from "@/shared/components/ConfirmDeleteDialog";
import React from "react";
import type { Contract } from "../types";
import { ContractDialog } from "./ContractDialog";

interface TableContractsActionsProps {
  contract: Contract;
  onEdit?: (contract: Contract) => void;
  onDelete?: (contract: Contract) => void;
}

export const TableContractsActions: React.FC<TableContractsActionsProps> = ({
  contract,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <ContractDialog
        initialValues={contract}
        onSave={(values) => onEdit?.(values)}
        trigger={<ButtonUpdateTable />}
      />

      <ConfirmDeleteDialog
        title="حذف العقد"
        description={`هل أنت متأكد من حذف العقد رقم ${contract.contractNumber}؟`}
        onConfirm={() => onDelete?.(contract)}
        trigger={<ButtonDeleteTable />}
      />
    </div>
  );
};

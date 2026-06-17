import { ButtonDeleteTable } from "@/shared/components/buttons/ButtonDeleteTable";
import { ButtonUpdateTable } from "@/shared/components/buttons/ButtonUpdateTable";
import { ConfirmDeleteDialog } from "@/shared/components/dialogs/ConfirmDeleteDialog";
import React from "react";
import type { Contract, ContractFormValues } from "../types";
import { ContractDialog } from "./ContractDialog";

interface TableContractsActionsProps {
  contract: Contract;
  onEdit?: (
    values: ContractFormValues,
    contractId: string,
  ) => Promise<void> | void;
  onDelete?: (contractId: string) => Promise<void> | void;
  isPending?: boolean;
}

export const TableContractsActions: React.FC<TableContractsActionsProps> = ({
  contract,
  onEdit,
  onDelete,
  isPending = false,
}) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <ContractDialog
        initialValues={contract}
        onSave={(values) => onEdit?.(values, contract.id)}
        isPending={isPending}
        trigger={<ButtonUpdateTable />}
      />

      <ConfirmDeleteDialog
        title="حذف العقد"
        description={`هل أنت متأكد من حذف العقد الخاص بالموكل ${contract.clientName}؟`}
        onConfirm={() => onDelete?.(contract.id)}
        trigger={<ButtonDeleteTable />}
      />
    </div>
  );
};

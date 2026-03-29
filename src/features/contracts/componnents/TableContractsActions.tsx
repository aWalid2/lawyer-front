import React from "react";
import type { Contract } from "../types";
import { EditIcon } from "@/shared/icons/Edit";
import { TrashIcon } from "@/shared/icons/Trash";
import { ContractDialog } from "./ContractDialog";
import { ConfirmDeleteDialog } from "@/shared/components/ConfirmDeleteDialog";

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
        trigger={
          <button
            title="تعديل"
            className="h-9 w-9 flex items-center justify-center rounded-main bg-[#F1F1F3] hover:bg-gray-200 transition-colors outline-none"
          >
            <EditIcon className="size-[14px] text-[#3D3C48]" />
          </button>
        }
      />

      <ConfirmDeleteDialog
        title="حذف العقد"
        description={`هل أنت متأكد من حذف العقد رقم ${contract.contractNumber}؟`}
        onConfirm={() => onDelete?.(contract)}
        trigger={
          <button
            title="حذف"
            className="h-9 w-9 flex items-center justify-center rounded-main bg-[#C60000]/8 hover:bg-red-100 transition-colors outline-none"
          >
            <TrashIcon className="size-[16px] text-[#C60000]" />
          </button>
        }
      />
    </div>
  );
};
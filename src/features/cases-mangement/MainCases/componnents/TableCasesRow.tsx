import React from "react";
import type { Case } from "../types/casesTypes";
import { TableCasesActions } from "./TableCasesActions";

export const TableCasesRow: React.FC<{
  caseItem: Case;
  index: number;
  isSelected?: boolean;
  onRowClick: (caseItem: Case) => void;
  onEdit?: (caseItem: Case) => void;
  onDelete?: (caseItem: Case) => void;
}> = ({ caseItem, index, isSelected, onRowClick, onEdit }) => {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case "متداولة":
        return "bg-[#5570F1]/20 text-[#5570F1]";
      case "تحت الرفع":
        return "bg-[#937F12]/20 text-[#937F12]";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <tr
      className={`cursor-pointer border-b border-[#F1F1F4] transition-colors hover:bg-gray-50 ${isSelected ? "bg-blue-50" : "bg-white"
        }`}
      onClick={() => onRowClick(caseItem)}
    >
      <td className="p-4 text-center text-sm text-gray-600 border-x border-[#F1F1F4]">
        {index}
      </td>
      <td className="p-4 text-center text-sm font-medium text-black border-x border-[#F1F1F4] whitespace-nowrap">
        {caseItem.caseNumber}
      </td>
      <td className="p-4 text-center text-sm text-gray-600 border-x border-[#F1F1F4] whitespace-nowrap">
        {caseItem.autoNumber}
      </td>
      <td className="p-4 text-center text-sm font-medium text-black border-x border-[#F1F1F4] whitespace-nowrap">
        {caseItem.clientName}
      </td>
      <td className="p-4 text-center text-sm text-gray-600 border-x border-[#F1F1F4] whitespace-nowrap">
        {caseItem.subject}
      </td>
      <td className="p-4 text-center border-x border-[#F1F1F4]">
        <span
          className={`px-3 py-1 rounded-[12px] text-xs font-medium whitespace-nowrap ${getStatusStyles(
            caseItem.status,
          )}`}
        >
          {caseItem.status}
        </span>
      </td>
      <td className="p-4 text-center border-x border-[#F1F1F4]">
        <TableCasesActions caseItem={caseItem} onEdit={onEdit} />
      </td>
    </tr>
  );
};

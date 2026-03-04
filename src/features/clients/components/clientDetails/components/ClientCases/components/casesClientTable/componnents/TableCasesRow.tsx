
import React from "react";
import type { TableRowProps } from '../../../../typesClientDetails'
import { TableCasesActions } from "./TableCasesActions";
export const TableCasesRow: React.FC<TableRowProps> = ({
  client,
  index,
  onRowClick,
  onEdit,
}) => {
  return (
    <tr
      className=" cursor-pointer transition-colors bg-white border-b border-[#F1F1F4] border-r"
      onClick={() => onRowClick(client)}
    >

      <td className="p-3 text-sm text-gray-600 border-l  border-[#F1F1F4] text-center">
        {index}
      </td>

      <td className="p-3 text-sm font-normal text-black border-l  border-[#F1F1F4] text-center">
        {client.code}
      </td>

      <td className="p-3 text-sm font-normal text-black border-l border-gray-200 text-center">
        {client.autoNumber}
      </td>


      <td className="p-3 text-sm font-medium text-gray-600 border-l border-gray-200 text-center">
        {client.subject}
      </td>


      <td className="-3 text-sm border-l border-gray-200 text-center">
        <span className="px-4 py-2 h-[30px] rounded-xl  bg-[#5570F1]/20 text-[#5570F1] text-xs font-normal shadow-sm">
          {client.status}
        </span>
      </td>


      <td className="p-3 text-sm font-medium text-gray-600 border-l border-gray-200 text-center">
        {client.role}
      </td>


      <td className="p-3 text-sm font-medium text-gray-600 border-l border-gray-200 text-center">
        {client.date}
      </td>


      <td className="p-3 text-sm">
        <TableCasesActions clientCases={client} onEdit={onEdit} />
      </td>
    </tr>
  );
};

import React from "react";
import type { TableRowProps } from "./typesClients";
import view from '@/public/images/view.svg';
import edit from '@/public/images/edit.svg';
import deleteIcon from '@/public/images/delete.svg';
import { Link } from "react-router-dom";

export const TableRow: React.FC<TableRowProps> = ({
  client,
  index,
  onRowClick,
  onEdit,
  onDelete,
}) => {
  return (
    <tr
      className="cursor-pointer transition-colors bg-white border-b border-gray-200 hover:bg-gray-50"
      onClick={() => onRowClick(client)}
    >
      <td className="text-gray-600 border-l border-gray-200 text-center">
        {index}
      </td>
      <td className="p-1.5 sm:p-2 md:p-3 text-xs sm:text-sm md:text-base text-gray-600 border-l border-gray-200 text-center">
        #{String(client.id).padStart(4, "0")}
      </td>
      <td className="p-1.5 sm:p-2 md:p-3 text-xs sm:text-sm md:text-base font-medium text-gray-800 border-l border-gray-200 text-center">
        {client.name}
      </td>
      <td
        className="p-1.5 sm:p-2 md:p-3 text-xs sm:text-sm md:text-base text-gray-600 border-l border-gray-200 text-center"
        dir="ltr"
      >
        {client.phone}
      </td>
      <td className="p-1.5 sm:p-2 md:p-3 text-xs sm:text-sm md:text-base text-gray-600 border-l border-gray-200 text-center">
        <span className="bg-[#A6A6A6] text-white inline-flex items-center justify-center w-7 sm:w-8 md:w-[35px] h-7 sm:h-8 md:h-[35px] rounded-lg text-xs md:text-sm">
          {client.casesCount || Math.floor(Math.random() * 10) + 1}
        </span>
      </td>
      <td className="p-1.5 sm:p-2 md:p-3 text-xs sm:text-sm md:text-base">
        <div className="flex items-center justify-center gap-2 md:gap-3">
          <Link to={`/dashboard/clients/${client.id}`} title="عرض التفاصيل">
            <img src={view} alt="view" />
          </Link>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.(client);
            }}
            title="تعديل"
            className="hover:scale-110 transition"
          >
            <img src={edit} alt="edit" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.(client.id);
            }}
            title="حذف"
            className="hover:scale-110 transition"
          >
            <img src={deleteIcon} alt="delete" />
          </button>
        </div>
      </td>
    </tr>
  );
};
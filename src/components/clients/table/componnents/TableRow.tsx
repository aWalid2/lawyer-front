// src/components/clients/table/TableRow.tsx
import React from "react";
import type { TableRowProps } from "../../types";
import view from '../../../../../public/images/view.svg';
import edit from '../../../../../public/images/edit.svg';
import deleteIcon from '../../../../../public/images/delete.svg';
export const TableRow: React.FC<TableRowProps> = ({
  client,
  index,
  onRowClick,
  onEdit,
  onDelete,
  onViewDetails,
}) => {
  return (
    <tr
      className=" cursor-pointer transition-colors bg-white border-b border-gray-200"
      onClick={() => onRowClick(client)}
    >
      {/* # */}
      <td className="p-3 text-sm text-gray-600 border-l border-gray-200 text-center">
        {index}
      </td>

      {/* كود الموكل */}
      <td className="p-3 text-sm text-gray-600 border-l border-gray-200 text-center">
        #{String(client.id).padStart(4, "0")}
      </td>

      {/* اسم الموكل */}
      <td className="p-3 text-sm font-medium text-gray-800 border-l border-gray-200 text-center">
        {client.name}
      </td>

      {/* رقم الهاتف */}
      <td
        className="p-3 text-sm text-gray-600 border-l border-gray-200 text-center"
        dir="ltr"
      >
        {client.phone}
      </td>

      {/* عدد القضايا */}
      <td className="p-3 text-sm text-gray-600 border-l border-gray-200 text-center">
        <span className="bg-gray-400 text-white inline-flex items-center justify-center w-[35px] h-[35px] rounded-lg">
          {client.casesCount || Math.floor(Math.random() * 10) + 1}
        </span>
      </td>
      {/* الإجراءات - أزرار بأيقونات في النص */}
      <td className="p-3 text-sm">
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails?.(client);
            }}
            title="عرض التفاصيل"
          >
            <img src={view} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.(client);
            }}
            title="تعديل"
          >
            <img src={edit} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.(client.id);
            }}
            title="حذف"
          >
            <img src={deleteIcon} />
          </button>
        </div>
      </td>
    </tr>
  );
};

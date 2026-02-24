// src/components/clients/table/TableRow.tsx
import React from 'react';
import { Eye, Edit2, Trash2 } from 'lucide-react';
import type { TableRowProps } from '../../types';
export const TableRow: React.FC<TableRowProps> = ({
  client,
  index,
  isSelected,
  onRowClick,
  onEdit,
  onDelete,
  onViewDetails
}) => {
  return (
    <tr
      className={`hover:bg-gray-50 cursor-pointer transition-colors ${
        index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
      } ${isSelected ? 'bg-blue-50' : ''} border-b border-gray-200`}
      onClick={() => onRowClick(client)}
    >
      {/* # */}
      <td className="p-3 text-sm text-gray-600 border-l border-gray-200 text-center">{index }</td>

      {/* كود الموكل */}
      <td className="p-3 text-sm text-gray-600 border-l border-gray-200 text-center">
        #{String(client.id).padStart(4, '0')}
      </td>

      {/* اسم الموكل */}
      <td className="p-3 text-sm font-medium text-gray-800 border-l border-gray-200 text-center">
        {client.name}
      </td>

      {/* رقم الهاتف */}
      <td className="p-3 text-sm text-gray-600 border-l border-gray-200 text-center" dir="ltr">
        {client.phone}
      </td>

      {/* عدد القضايا */}
      <td className="p-3 text-sm text-gray-600 border-l border-gray-200 text-center">
        {client.casesCount || Math.floor(Math.random() * 10) + 1}
      </td>

      {/* الإجراءات - أزرار بأيقونات في النص */}
      <td className="p-3 text-sm">
        <div className="flex items-center justify-center gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails?.(client);
            }}
            className="p-1.5 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors border border-blue-200"
            title="عرض التفاصيل"
          >
            <Eye size={16} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.(client);
            }}
            className="p-1.5 bg-green-50 text-green-600 rounded hover:bg-green-100 transition-colors border border-green-200"
            title="تعديل"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.(client.id);
            }}
            className="p-1.5 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors border border-red-200"
            title="حذف"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
};
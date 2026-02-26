import React from 'react'
import { Link } from 'react-router-dom'
import view from '../../../../../../../../public/images/view.svg'
import edit from '../../../../../../../../public/images/edit.svg';
import deleteIcon from '../../../../../../../../public/images/delete.svg';
import type { ClientCase } from '../../types';

export const TableCasesActions: React.FC<{client: ClientCase, onEdit?: (client: ClientCase) => void, onDelete?: (id: number) => void}> = ({client, onEdit, onDelete}) => {
  return (
    <div className="flex items-center justify-center gap-3">
          <Link
            to={`/dashboard/clients/${client.id}`}
            title="عرض التفاصيل"
          >
            <img src={view} alt="view" />
          </Link>
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
  )
}
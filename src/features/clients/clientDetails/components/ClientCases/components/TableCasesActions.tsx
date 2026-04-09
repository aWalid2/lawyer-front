import React from 'react'
import { Link } from 'react-router-dom'
import view from '@/public/images/view.svg'
import edit from '@/public/images/edit.svg';
import type { ClientCase } from '../../../types/typesClientDetails';
import { EditClientCaseDialog } from './EditClientCaseDialog';
import { SearchIcon } from '@/shared/icons/Search';

export const TableCasesActions: React.FC<{ client: ClientCase, onEdit?: (client: ClientCase) => void }> = ({ client, onEdit }) => {
  return (
    <div className="flex items-center justify-center gap-3">
      <Link
        to={`/dashboard/case-management/${client.id}`}
        title="عرض التفاصيل"
      >
        <img src={view} alt="view" />
      </Link>
      <EditClientCaseDialog caseItem={client} onSave={onEdit} trigger={<button><img src={edit} /></button>} />
      <Link
        to={`#`}
        onClick={(e) => e.stopPropagation()}
        title="عرض القضية"
        className="h-9 w-9 flex items-center justify-center rounded-lg bg-[#FEEFE2]"
      >
        <SearchIcon className="size-[14px] text-[#F38630]" />
      </Link>
    </div>
  )
}


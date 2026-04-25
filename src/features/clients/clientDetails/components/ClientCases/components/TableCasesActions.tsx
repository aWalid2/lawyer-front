import { ButtonUpdateTable } from '@/shared/components/ButtonUpdateTable';
import { ViewLinkTablePageDetails } from '@/shared/components/ViewLinkTablePageDetails';
import { SearchIcon } from '@/shared/icons/Search';
import React from 'react';
import { Link } from 'react-router-dom';
import type { ClientCase } from '../../../types/typesClientDetails';
import { EditClientCaseDialog } from './EditClientCaseDialog';

export const TableCasesActions: React.FC<{ client: ClientCase, onEdit?: (client: ClientCase) => void }> = ({ client, onEdit }) => {
  return (
    <div className="flex items-center justify-center gap-3">
      <ViewLinkTablePageDetails to={`/dashboard/case-management/${client.id}`} />
      <EditClientCaseDialog caseItem={client} onSave={onEdit} trigger={<ButtonUpdateTable />} />
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


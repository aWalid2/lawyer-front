import React from 'react'
import { Link } from 'react-router-dom'
import view from '../../../../../../../../public/images/view.svg'
import edit from '../../../../../../../../public/images/edit.svg';
import type { ClientCase } from '../../../../typesClientDetails';
import { SearchIcon } from '@/components/shared/icons/Search';

export const TableCasesActions: React.FC<{clientCases: ClientCase, onEdit?: (clientCases: ClientCase) => void}> = ({clientCases, onEdit}) => {
  return (
    <div className="flex items-center justify-center gap-3">
          <Link
            to={`/dashboard/case-management/${clientCases?.id}`}
            title="عرض التفاصيل"
          >
            <img src={view} alt="view" />
          </Link>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.(clientCases);
            }}
            title="تعديل"
          >
            <img src={edit} />
          </button>
          <Link
            to={'#'}  
            title="عرض القضية"
            className='h-[36px] w-[36px] flex items-center justify-center rounded-[8px] bg-primary/15'
          >
            <SearchIcon  className='size-[15px] text-primary'/>
          </Link>
        </div>
  )
}
import React from 'react'
import { Link } from 'react-router-dom'

import type { ClientCase } from '../../../../typesClientDetails';
import { SearchIcon } from '@/components/shared/icons/Search';
import { ViewIcon } from '@/components/shared/icons/View';
import { EditIcon } from '@/components/shared/icons/Edit';

export const TableCasesActions: React.FC<{clientCases: ClientCase, onEdit?: (clientCases: ClientCase) => void}> = ({clientCases, onEdit}) => {
  return (
    <div className="flex items-center justify-center gap-3">
          <Link
            to={`/dashboard/case-management/${clientCases?.id}`}
            title="عرض التفاصيل"
                    className='h-[36px] w-[36px] flex items-center justify-center rounded-[8px] bg-[#F0F6FF]'
          >
            <ViewIcon className='text-[#63A4F9]'/>
          </Link>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.(clientCases);
            }}
            title="تعديل"
            className='h-[36px] w-[36px] flex items-center justify-center rounded-[8px] bg-[#F1F1F3]'
          >
            <EditIcon className='size-[15px] text-[#3D3C48]'/>
          </button>
          <Link
            to={'#'}  
            title="عرض القضية"
            className='h-[36px] w-[36px] flex items-center justify-center rounded-[8px] bg-primary/15'
          >
            <SearchIcon  className='size-[15px] text-primary '/>
          </Link>
        </div>
  )
}
import React from 'react'
import { ViewIcon } from '@/components/shared/icons/View';
import { EditIcon } from '@/components/shared/icons/Edit';
import { Link } from 'react-router-dom';
import { SearchIcon } from '@/components/shared/icons/Search';


interface RelationalCasesProps {
    caseItem: any;
    onEdit: (caseItem: any) => void;
    onView: (caseItem: any) => void;
}

export const RelationalCasesActions: React.FC<RelationalCasesProps> = ({ caseItem, onEdit, onView }) => {
    return (
        <div className="flex items-center justify-center gap-2">
            <button
                type="button"
                onClick={(e) => {
                    e.stopPropagation();
                    onView?.(caseItem);
                }}
                title="عرض"
                className="h-9 w-9 flex items-center justify-center rounded-[8px] bg-[#F0F6FF] transition-colors hover:bg-[#e0eaff]"
            >
                <ViewIcon className="size-[16px] text-[#63A4F9]" />
            </button>

            <button
                type="button"
                onClick={(e) => {
                    e.stopPropagation();
                    onEdit?.(caseItem);
                }}
                title="تعديل"
                className="h-9 w-9 flex items-center justify-center rounded-[8px] bg-[#F1F1F3] transition-colors hover:bg-[#e4e4e7]"
            >
                <EditIcon className="size-[14px] text-[#3D3C48]" />
            </button>

            <Link
                to={`#`}
                title="عرض القضية"
                className="h-9 w-9 flex items-center justify-center rounded-lg bg-[#FEEFE2]"
            >
                <SearchIcon className="size-[14px] text-[#F38630]" />
            </Link>
        </div>
    )
}

import React from 'react'
import { EditIcon } from '../icons/Edit'

export const TableEditButton = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
    ({ className, ...props }, ref) => {
        return (
            <button
                ref={ref}
                title="تعديل"
                className="h-9 w-9 flex items-center justify-center rounded-main bg-[#F1F1F3] hover:bg-gray-200 transition-colors outline-none"
                {...props}
            >
                <EditIcon className="size-[14px] text-[#3D3C48]" />
            </button>
        )
    }
)

TableEditButton.displayName = "TableEditButton"

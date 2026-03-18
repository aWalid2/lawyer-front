import React from 'react'
import { TrashIcon } from '../icons/Trash'

export const TableDeleteButton = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
    ({ className, ...props }, ref) => {
        return (
            <button
                ref={ref}
                title="حذف"
                className="h-9 w-9 flex items-center justify-center rounded-main bg-[#C60000]/8 hover:bg-red-100 transition-colors outline-none"
                {...props}
            >
                <TrashIcon className="size-[16px] text-[#C60000]" />
            </button>
        )
    }
)

TableDeleteButton.displayName = "TableDeleteButton"

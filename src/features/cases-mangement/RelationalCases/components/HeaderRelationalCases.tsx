import { HeaderTitle } from '@/components/shared/components/HeaderTitle'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { RelationalCaseDialog } from './RelationalCaseDialog'

export const HeaderRelationalCases = ({ title }: { title: string }) => {
    return (
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <HeaderTitle title={title} />
            <RelationalCaseDialog title='إضافة قضية مرتبطة' trigger={<Button
                className="rounded-[12px] h-12.5 px-6 bg-primary-gradient font-semibold text-white flex items-center gap-2"
            >
                <Plus />
                إضافة قضية مرتبطة
            </Button>} />
        </div>
    )
}

import { HeaderTitle } from '@/components/shared/components/HeaderTitle'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { RelationalAddCaseDialog } from './RelationalAddCaseDialog'

export const HeaderRelationalCases = ({ title, buttonTitle }: { title: string, buttonTitle: string }) => {
    return (
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <HeaderTitle title={title} />
            <RelationalAddCaseDialog />
        </div>
    )
}

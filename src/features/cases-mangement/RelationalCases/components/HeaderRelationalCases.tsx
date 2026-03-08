import { HeaderTitle } from '@/components/shared/components/HeaderTitle'
import { RelationalAddCaseDialog } from './RelationalAddCaseDialog'

export const HeaderRelationalCases = ({ title }: { title: string }) => {
    return (
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <HeaderTitle title={title} />
            <RelationalAddCaseDialog />
        </div>
    )
}

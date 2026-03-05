import { HeaderTitle } from '@/components/shared/components/HeaderTitle'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export const HeaderRelationalCases = ({ title, buttonTitle }: { title: string, buttonTitle: string }) => {
    return (
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <HeaderTitle title={title} />
            <Button
                className="rounded-[12px] h-12.5 px-6 bg-primary-gradient font-semibold text-white flex items-center gap-2"
            >
                <Plus />
                {buttonTitle}
            </Button>
        </div>
    )
}

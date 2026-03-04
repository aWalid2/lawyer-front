
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'


export const HeaderFirstDegreeSessionsTable = () => {
    return (
        <div className='flex justify-between items-center mb-4'>
            <h2 className='text-lg  font-semibold text-secondary'>جلسات أول درجة</h2>
            <Button className='bg-primary/15 text-primary px-8 py-2.5 max-w-[144px] h-12.5 rounded-[12px] font-semibold text-base hover:opacity-90 transition-opacity hover:text-white'> <PlusIcon className="w-4 h-4" /> إضافة جلسة </Button>
        </div>
    )
}

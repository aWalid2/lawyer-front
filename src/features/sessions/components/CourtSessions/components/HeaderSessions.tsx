import { EditIcon } from '@/components/shared/icons/Edit'
import { Button } from '@/components/ui/button'


export const HeaderSessions = () => {
    return (
        <div className='flex justify-between items-center mb-4'>
            <h2 className='text-lg  font-semibold text-secondary'>بيانات  أول درجة</h2>
            <Button className='bg-[#f1f1f3] text-[#3D3C48] text-base h-12.5   font-semibold'> <EditIcon className="w-4 h-4" /> تعديل </Button>
        </div>
    )
}

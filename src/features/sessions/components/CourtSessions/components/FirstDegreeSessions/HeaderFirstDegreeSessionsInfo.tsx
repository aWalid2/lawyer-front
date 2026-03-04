
import { FormFirstDegreeDialog } from './components/FormFirstDegreeDialog'


export const HeaderFirstDegreeSessionsInfo = () => {
    return (
        <div className='flex justify-between items-center mb-4'>
            <h2 className='text-lg  font-semibold text-secondary'>بيانات  أول درجة</h2>
            <FormFirstDegreeDialog />
        </div>
    )
}

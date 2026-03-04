
import { FormFirstDegreeDialog } from './components/FormFirstDegreeDialog'


export const HeaderFirstDegreeSessionsInfo = () => {
    return (
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 w-full pb-6">
            <h2 className="text-xl font-semibold text-secondary font-cairo whitespace-nowrap self-start md:self-center">
                بيانات أول درجة
            </h2>
            <FormFirstDegreeDialog />
        </div>
    );
};

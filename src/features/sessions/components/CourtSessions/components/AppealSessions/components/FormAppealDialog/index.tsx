
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { EditIcon } from "@/components/shared/icons/Edit";
import { Button } from "@/components/ui/button";

export const FormAppealDialog = () => {
    return (
        <Dialog>
            <Button className='bg-[#f1f1f3] text-[#3D3C48] text-base h-12.5   font-semibold hover:text-white'> <EditIcon className="w-4 h-4" /> تعديل </Button>
            <DialogContent className="max-w-2xl bg-white" dir="rtl">
                <DialogHeader>
                    <DialogTitle className="text-right text-xl font-bold font-cairo text-secondary">
                        تعديل معلومات الاستئناف
                    </DialogTitle>
                </DialogHeader>
                <div className="p-4 bg-gray-50 rounded-lg text-center">
                    قريباً: نموذج تعديل بيانات الاستئناف
                </div>
            </DialogContent>
        </Dialog>
    );
};

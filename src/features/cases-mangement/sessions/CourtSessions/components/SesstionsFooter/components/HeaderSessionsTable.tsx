import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { SessionDialog } from './SessionDialog';

export const HeaderSessionsTable = ({ title }: { title: string }) => {
    return (
        <div className="flex flex-wrap items-center justify-between gap-2 w-full pb-6">
            <h2 className="text-xl font-semibold text-secondary font-cairo whitespace-nowrap self-start md:self-center">
                {title}
            </h2>
            <SessionDialog
                onSave={(values) => console.log("Adding session:", values)}
                trigger={
                    <Button className="bg-[#BF9A61] hover:bg-[#A68654] text-white shadow-[0_4px_14px_0_rgba(191,154,97,0.39)] h-12.5 px-8 rounded-main flex items-center gap-2 text-sm font-semibold transition-all active:scale-95 whitespace-nowrap">
                        <PlusIcon className="w-4 h-4" /> إضافة جلسة
                    </Button>
                }
            />
        </div>
    );
};

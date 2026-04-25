import React from 'react';
import { Plus } from 'lucide-react';
import { ProsecutionFormDialog } from './ProsecutionFormDialog';
import { HeaderSearch } from '@/shared/components/HeaderSearch';
import { HeaderTitle } from '@/shared/components/HeaderTitle';

interface ProsecutionsHeaderProps {
    searchTerm: string;
    onSearch: (value: string) => void;
    onProsecutionAdded: () => void;
}

export const ProsecutionsHeader: React.FC<ProsecutionsHeaderProps> = ({
    searchTerm,
    onSearch,
    onProsecutionAdded,
}) => {
    const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);

    const handleSaveProsecution = () => {
        onProsecutionAdded();
        setIsAddModalOpen(false);
    };

    return (
        <div className="flex flex-col sm:flex-row justify-between  sm:items-center gap-4 mb-6">
            <HeaderTitle title='النيابات العامه' />
            <HeaderSearch
                value={searchTerm}
                onChange={onSearch}
                className="lg:ms-0"
            />

            <ProsecutionFormDialog
                trigger={
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="flex items-center justify-center gap-1 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 text-white text-xs md:text-base font-cairo rounded-lg md:rounded-[12px] transition-all whitespace-nowrap h-9 sm:h-10 md:h-[50px] relative overflow-hidden shrink-0 order-3 w-full sm:w-auto"
                        style={{
                            background: "linear-gradient(135deg, #E3C086 0%, #CBA462 100%)",
                        }}
                    >
                        <Plus className="h-4 w-4" />
                        <span>إضافة نيابة جديدة</span>
                    </button>
                }
                open={isAddModalOpen}
                onOpenChange={setIsAddModalOpen}
                onSave={handleSaveProsecution}
            />
        </div>
    );
};
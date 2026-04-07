import React from 'react';
import { Plus } from 'lucide-react';
import { PoliceStationFormDialog } from './PoliceStationFormDialog';
import { HeaderSearch } from '@/shared/components/HeaderSearch';
import { HeaderTitle } from '@/shared/components/HeaderTitle';

interface PoliceStationsHeaderProps {
    searchTerm: string;
    onSearch: (value: string) => void;
    onStationAdded: () => void;
}

export const PoliceStationsHeader: React.FC<PoliceStationsHeaderProps> = ({
    searchTerm,
    onSearch,
    onStationAdded,
}) => {
    const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);

    const handleSaveStation = () => {
        onStationAdded();
        setIsAddModalOpen(false);
    };

    return (
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
            <HeaderTitle  title="المخافر" />
            <HeaderSearch 
                value={searchTerm} 
                onChange={onSearch} 
                className="lg:ms-15" 
            />

            <PoliceStationFormDialog
                trigger={
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="flex items-center justify-center gap-1 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 text-white text-xs md:text-base font-cairo rounded-lg md:rounded-[12px] transition-all whitespace-nowrap h-9 sm:h-10 md:h-[50px] relative overflow-hidden flex-shrink-0 order-3 w-full sm:w-auto"
                        style={{
                            background: "linear-gradient(135deg, #E3C086 0%, #CBA462 100%)",
                        }}
                    >
                        <Plus className="h-4 w-4" />
                        <span>إضافة مخفر</span>
                    </button>
                }
                open={isAddModalOpen}
                onOpenChange={setIsAddModalOpen}
                onSave={handleSaveStation}
            />
        </div>
    );
};
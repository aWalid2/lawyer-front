import { ButtonDeleteTable } from "@/shared/components/ButtonDeleteTable";
import { ConfirmDeleteDialog } from "@/shared/components/ConfirmDeleteDialog";
import { useState } from "react";
import { CLASSES } from "../index";

interface Props {
    services: string[];
    setServices: React.Dispatch<React.SetStateAction<string[]>>;
}

const ServicesSection = ({ services, setServices }: Props) => {
    const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
    const [newService, setNewService] = useState("");

    const handleAddService = () => {
        if (newService.trim()) {
            setServices([...services, newService]);
            setNewService("");
            setIsServiceModalOpen(false);
        }
    };

    const handleDeleteService = (index: number) => {
        setServices(services.filter((_, i) => i !== index));
    };

    return (
        <>
            <h2 className="text-sm md:text-base font-medium">الخدمات</h2>
            <div className="border border-gray-300 p-4 rounded-lg">
                <div className="flex flex-wrap gap-3">
                    {services.map((service, index) => (
                        <div key={index} className="bg-[#FBFBFB] p-3 rounded-lg border border-gray-200 w-full sm:w-[308px] h-[50px] flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-700 truncate flex-1">{service}</span>
                            <ConfirmDeleteDialog
                                title="حذف الخدمة"
                                description={`هل أنت متأكد من حذف الخدمة ${service} ؟`}
                                onConfirm={() => handleDeleteService(index)}
                                trigger={
                                    <ButtonDeleteTable />
                                }
                            />
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => setIsServiceModalOpen(true)}
                        className="w-full sm:w-[308px] h-[50px] text-[#CBA462] rounded-lg border border-[#CBA462] flex items-center justify-center gap-2 text-lg hover:bg-[#CBA462] hover:text-white transition-colors"
                    >
                        + إضافة خدمة
                    </button>
                </div>
            </div>


            {isServiceModalOpen && (
                <div className={CLASSES.modalOverlay} onClick={() => setIsServiceModalOpen(false)}>
                    <div className={CLASSES.modalContent} onClick={(e) => e.stopPropagation()}>
                        <h3 className={CLASSES.modalTitle}>إضافة خدمة جديدة</h3>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1 text-right">نوع الخدمة</label>
                            <input
                                type="text"
                                value={newService}
                                onChange={(e) => setNewService(e.target.value)}
                                className={CLASSES.modalInput}
                                placeholder="أدخل اسم الخدمة"
                                autoFocus
                            />
                        </div>
                        <div className={CLASSES.modalButtons}>
                            <button
                                onClick={handleAddService}
                                className={`${CLASSES.modalButton} bg-[#E3C086] hover:bg-[#CBA462]`}
                            >
                                إضافة
                            </button>
                            <button
                                onClick={() => setIsServiceModalOpen(false)}
                                className={`${CLASSES.modalButton} bg-gray-400 hover:bg-gray-500`}
                            >
                                إلغاء
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ServicesSection;
import { ButtonDeleteTable } from "@/shared/components/buttons/ButtonDeleteTable";
import { ConfirmDeleteDialog } from "@/shared/components/dialogs/ConfirmDeleteDialog";
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
      <h2 className="text-sm font-medium md:text-base">الخدمات</h2>
      <div className="rounded-lg border border-gray-300 p-4">
        <div className="flex flex-wrap gap-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="flex h-[50px] w-full items-center gap-2 rounded-lg border border-gray-200 bg-[#FBFBFB] p-3 sm:w-[308px]"
            >
              <span className="flex-1 truncate text-sm font-medium text-gray-700">
                {service}
              </span>
              <ConfirmDeleteDialog
                title="حذف الخدمة"
                description={`هل أنت متأكد من حذف الخدمة ${service} ؟`}
                onConfirm={() => handleDeleteService(index)}
                trigger={<ButtonDeleteTable />}
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => setIsServiceModalOpen(true)}
            className="flex h-[50px] w-full items-center justify-center gap-2 rounded-lg border border-[#CBA462] text-lg text-[#CBA462] transition-colors hover:bg-[#CBA462] hover:text-white sm:w-[308px]"
          >
            + إضافة خدمة
          </button>
        </div>
      </div>

      {isServiceModalOpen && (
        <div
          className={CLASSES.modalOverlay}
          onClick={() => setIsServiceModalOpen(false)}
        >
          <div
            className={CLASSES.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className={CLASSES.modalTitle}>إضافة خدمة جديدة</h3>
            <div>
              <label className="mb-1 block text-right text-sm text-gray-600">
                نوع الخدمة
              </label>
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

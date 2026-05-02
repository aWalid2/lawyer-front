import { ButtonUpdateInfo } from "@/shared/components/ButtonUpdateInfo";
import { HeaderTitle } from "@/shared/components/HeaderTitle";
export const HeaderPoliceSessionsInfo = ({
  handleAddClick,
  handleEditClick,
  hasData,
}: {
  handleAddClick: () => void;
  handleEditClick: () => void;
  hasData: boolean;
}) => {
  return (
    <div className="flex items-center justify-between pb-8">
      <HeaderTitle innerPage title="بيانات المخفر" />
      <div className="flex gap-3">
        {!hasData && (
          <ButtonUpdateInfo text="إضافة" onEdit={handleAddClick} type="add" />
        )}

        {hasData && (
          <ButtonUpdateInfo text="تعديل" onEdit={handleEditClick} type="edit" />
        )}
      </div>
    </div>
  );
};

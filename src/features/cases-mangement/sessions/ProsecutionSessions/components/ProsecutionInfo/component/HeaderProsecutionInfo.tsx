import { ButtonUpdateInfo } from "@/shared/components/ButtonUpdateInfo";
import { HeaderTitle } from "@/shared/components/HeaderTitle";

export const HeaderProsecutionInfo = ({
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
      <HeaderTitle innerPage title="بيانات النيابة العامة" />
      <div className="flex gap-3">
        {!hasData && (
          <ButtonUpdateInfo onEdit={handleAddClick} text="إضافة" type="add" />
        )}

        {hasData && <ButtonUpdateInfo onEdit={handleEditClick} />}
      </div>
    </div>
  );
};

export default HeaderProsecutionInfo;

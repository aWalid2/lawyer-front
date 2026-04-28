import { ButtonUpdateInfo } from "@/shared/components/ButtonUpdateInfo";
import { EditIcon } from "lucide-react";

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
      <h1 className="font-cairo text-xl">بيانات النيابة العامة</h1>
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

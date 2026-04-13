
import { useState } from "react";
import type { FormValues } from "../../types/typsePolice";
import { InputBox } from "./component/InputBox";
import EditModel from "./component/PoliceStationInfoModel";
import { HeaderPoliceSessionsInfo } from "./component/HeaderPoliceSessionsInfo";
import { BodyInfo } from "./component/BodyInfo";
const PoliceStationInfo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");

  const initialValues: FormValues = {
    caseTitle: "قضية 123",
    clientName: "أحمد محمد",
    investigationSource: "النيابة العامة",
    caseReceiptDate: "2024-03-20",
    notes: "مخفر الشرطة",
  };

  const handleAddClick = () => {
    setModalMode("add");
    setIsModalOpen(true);
  };

  const handleEditClick = () => {
    setModalMode("edit");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveChanges = (values: FormValues) => {
    if (modalMode === "add") {
      console.log("تم إضافة بيانات جديدة:", values);
    } else {
      console.log("تم تعديل البيانات:", values);
    }
    setIsModalOpen(false);
  };

  const emptyValues: FormValues = {
    caseTitle: "",
    clientName: "",
    investigationSource: "",
    caseReceiptDate: "",
    notes: "",
  };

  return (
    <>

      <div className="border border-gray-300 p-4 rounded-xl mb-6">


        <HeaderPoliceSessionsInfo handleAddClick={handleAddClick} handleEditClick={handleEditClick} />


        <BodyInfo items={initialValues} />

        {isModalOpen && (
          <EditModel
            mode={modalMode}
            initialValues={modalMode === "add" ? emptyValues : initialValues}
            onClose={handleCloseModal}
            onSave={handleSaveChanges}
          />
        )}
      </div>

    </>
  );
};

export default PoliceStationInfo;
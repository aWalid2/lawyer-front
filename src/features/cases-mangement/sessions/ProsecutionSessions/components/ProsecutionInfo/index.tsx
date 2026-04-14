
import { useState } from "react";
import type { FormValues } from "../../types/typseProsecution";
import ProsecutionInfoModel from "./component/ProsecutionInfoModel";
import HeaderProsecutionInfo from "./component/HeaderProsecutionInfo";
import { BodyProsecutionInf } from "./component/BodyProsecutionInf";
import { useGetProsecutionSessionInfo } from "../../api/hooks/useGetProsecutionSessionInfo";
import { useParams } from "react-router-dom";
import { EmptyTable } from "@/shared/components/EmptyTable";

const ProsecutionInfo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");

  const { id } = useParams<{ id: string }>();
  const { data } = useGetProsecutionSessionInfo(Number(id));

  const initialValues: FormValues = {
    caseNumberInProsecution: data?.caseNumberInProsecution,
    prosecutionName: data?.prosecutionName,
    prosecutionRegistrationDate: data?.prosecutionRegistrationDate,
    policeStation: data?.policeStation,
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
    caseNumberInProsecution: "",
    prosecutionName: "",
    prosecutionRegistrationDate: "",
    policeStation: "",
  };

  return (
    <>
      <div className="border border-gray-300 p-4 rounded-xl mb-6">
        <HeaderProsecutionInfo handleAddClick={handleAddClick} handleEditClick={handleEditClick} hasData={!!data} />

        {data ? <BodyProsecutionInf data={data} /> : <EmptyTable message="لا توجد بيانات" />}

        {isModalOpen && (
          <ProsecutionInfoModel
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

export default ProsecutionInfo;
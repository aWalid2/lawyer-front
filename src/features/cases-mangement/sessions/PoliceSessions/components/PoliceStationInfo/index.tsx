import { useState } from "react";
import type { FormValues } from "../../types/typsePolice";
import EditModel from "./component/PoliceStationInfoModel";
import { HeaderPoliceSessionsInfo } from "./component/HeaderPoliceSessionsInfo";
import { BodyInfo } from "./component/BodyInfo";
import { useGetPoliceSessionInfo } from "../../api/hooks/useGetPoliceSessionInfo";
import { useParams } from "react-router-dom";
import { EmptyTable } from "@/shared/components/EmptyTable";
import { CustomLayoutBorder } from "@/shared/components/CustomLayoutBorder";

const PoliceStationInfo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");

  const { id } = useParams<{ id: string }>();
  const { data } = useGetPoliceSessionInfo(Number(id));
  const initialValues: FormValues = {
    case_number: data?.case_number,
    judge_name: data?.judge_name,
    investigation_authirity_transferd_from:
      data?.investigation_authirity_transferd_from,
    case_entry: data?.case_entry,
    station_id: data?.station_id,
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
    case_number: "",
    judge_name: "",
    investigation_authirity_transferd_from: "",
    case_entry: "",
    station_id: "",
  };

  return (
    <CustomLayoutBorder>
      <HeaderPoliceSessionsInfo
        handleAddClick={handleAddClick}
        handleEditClick={handleEditClick}
        hasData={!!data}
      />

      {data ? (
        <BodyInfo items={data} />
      ) : (
        <EmptyTable message="لا توجد بيانات" />
      )}

      {isModalOpen && (
        <EditModel
          mode={modalMode}
          initialValues={modalMode === "add" ? emptyValues : initialValues}
          onClose={handleCloseModal}
          onSave={handleSaveChanges}
        />
      )}
    </CustomLayoutBorder>
  );
};

export default PoliceStationInfo;

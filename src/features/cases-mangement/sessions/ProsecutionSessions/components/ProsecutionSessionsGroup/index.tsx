import { useState } from "react";
import { DataTable, type Column } from "@/shared/components/DataTable";
import { Pagination } from "@/shared/components/Pagination";
import { useParams } from "react-router-dom";

import ProsecutionSessionsModel from "./components/ProsecutionSessionsModel";
import { ActionsCoulmn } from "./components/ActionsCoulmn";
import { useGetProsecutionSessions } from "../../api/hooks/useGetProsecutionSessions";
import {
  formatDateToTime,
  formatDateToYYYYMMDD,
} from "@/shared/utils/convertDate";
import { useIndexedData } from "@/shared/utils/useIndexedData";
import { EmptyTable } from "@/shared/components/EmptyTable";
import LoadingPage from "@/shared/components/LoadingPage";
import { HeaderSessions } from "./components/HeaderSessions";
import { CustomLayoutBorder } from "@/shared/components/CustomLayoutBorder";

const ProsecutionSessionsGroup = () => {
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSession, setEditingSession] = useState<any | null>(null);

  const { id } = useParams<{ id: string }>();
  const { data: sessionsResponse, isPending } = useGetProsecutionSessions(
    Number(id),
    page,
    5,
  );
  const sessions = sessionsResponse?.data || [];
  const totalPages = sessionsResponse?.meta?.lastPage || 1;

  const indexedData = useIndexedData(sessions, page, 5);

  const handleAdd = () => {
    setEditingSession(null);
    setIsModalOpen(true);
  };

  const handleEdit = (session: any) => {
    setEditingSession(session);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingSession(null);
  };

  const columns: Column<any>[] = [
    {
      header: "#",
      accessor: (item) => item.rowNumber,
      headerClassName: "w-[60px]",
    },
    {
      header: "تاريخ الجلسة",
      accessor: (item) => formatDateToYYYYMMDD(item.session_date),
    },
    {
      header: "وقت الجلسة",
      accessor: (item) => formatDateToTime(item.session_date),
    },
    {
      header: "المحامي المتابع",
      accessor: (item) => item?.lawyer?.user?.first_name || "لا يوجد",
    },
    {
      header: "قرار الجلسة",
      accessor: (item) => item.session_ruling || "لا يوجد",
    },
    {
      header: "الإجراءات",
      accessor: (item) => (
        <ActionsCoulmn item={item} onEdit={() => handleEdit(item)} />
      ),
    },
  ];

  return (
    <CustomLayoutBorder>
      <HeaderSessions handleAdd={handleAdd} />
      {sessions.length > 0 ? (
        <>
          {isPending ? (
            <LoadingPage />
          ) : (
            <DataTable data={indexedData} columns={columns} rowIdField="id" />
          )}
          {totalPages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          )}
        </>
      ) : (
        <EmptyTable message="لا توجد جلسات لعرضها" />
      )}

      {isModalOpen && (
        <ProsecutionSessionsModel
          onClose={handleCloseModal}
          initialValues={editingSession || undefined}
          mode={editingSession ? "edit" : "add"}
        />
      )}
    </CustomLayoutBorder>
  );
};

export default ProsecutionSessionsGroup;

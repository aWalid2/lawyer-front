import React from "react";
import { DataTable, type Column } from "@/shared/components/DataTable";
import { ExpertsActions } from "./components/ExpertsActions";
import AddExpertModal from "./components/AddExpertModal";
import { HeaderExpertsSessions } from "./components/HeaderExpertsSessions";
import type {
  ExpertSessionResponse,
  ExpertSessionStatus,
} from "../../types/ExpertSessionApiTypes";
import { STATUS_LABEL } from "../../types/ExpertSessionApiTypes";
import LoadingPage from "@/shared/components/LoadingPage";
import { Error } from "@/shared/components/Error";
import { EmptyTable } from "@/shared/components/EmptyTable";
import { Pagination } from "@/shared/components/Pagination";
import { formatDateToYYYYMMDD } from "@/shared/utils/convertDate";
import { truncateWords } from "@/shared/utils/truncate";
import { useExpertSessionsTable } from "./hooks/useExpertSessionsTable";
import { CustomLayoutBorder } from "@/shared/components/CustomLayoutBorder";

const StatusCell: React.FC<{ status: ExpertSessionStatus }> = ({ status }) => {
  const getStatusStyle = (s: ExpertSessionStatus): string => {
    switch (s) {
      case "APPROVED":
        return "bg-[#11B32433] text-[#0B6E1F]";
      case "UNDER_OBJECTION":
        return "bg-[#C600001F] text-[#C60000]";
      case "UNDER_REVIEW":
        return "bg-[#DBC33B29] text-[#9E7F0F]";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };
  return (
    <span
      className={`inline-block rounded-full px-3 py-1.5 text-sm font-medium ${getStatusStyle(status)}`}
    >
      {STATUS_LABEL[status]}
    </span>
  );
};

export const TableExpertsSessions: React.FC = () => {
  const {
    page,
    setPage,
    isPending,
    isError,
    indexedExpertsData,
    totalPages,
    isModalOpen,
    editingExpert,
    handleOpenModal,
    handleEditExpert,
    handleCloseModal,
    handleSaveExpert,
    handleDelete,
    isSubmitting,
  } = useExpertSessionsTable();

  const columns: Column<ExpertSessionResponse>[] = [
    {
      header: "#",
      accessor: (item) => item.rowNumber,
    },
    {
      header: "الجهة المكلفة",
      accessor: (item) => (
        <span title={item.assigning_authority}>
          {truncateWords(item.assigning_authority, 3)}
        </span>
      ),
    },
    {
      header: "تاريخ التكليف",
      accessor: (item) => formatDateToYYYYMMDD(item.assignment_date),
    },
    {
      header: "مكتب الخبراء",
      accessor: (item) => (
        <span title={item.expert_office_name}>
          {truncateWords(item.expert_office_name, 3)}
        </span>
      ),
    },

    {
      header: "الرأي النهائي",
      accessor: (item) => (
        <span title={item.final_opinion}>
          {truncateWords(item.final_opinion, 3)}
        </span>
      ),
    },

    {
      header: "الحالة",
      accessor: (item) => <StatusCell status={item.status} />,
    },
    {
      header: "إجراء",
      accessor: (item) => (
        <ExpertsActions
          expertItem={item}
          onEdit={() => handleEditExpert(item)}
          onDelete={() => handleDelete(item)}
        />
      ),
    },
  ];

  if (isError) {
    return <Error message="حدث خطأ أثناء جلب بيانات جلسات الخبراء." />;
  }
  if (isPending) return <LoadingPage />;
  return (
    <CustomLayoutBorder>
      <HeaderExpertsSessions handleOpenModal={handleOpenModal} />

      {indexedExpertsData?.length === 0 ? (
        <EmptyTable message="لا يوجد جلسات خبراء" />
      ) : (
        <DataTable data={indexedExpertsData} columns={columns} rowKey="id" />
      )}
      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
      {isModalOpen && (
        <AddExpertModal
          onClose={handleCloseModal}
          onSave={handleSaveExpert}
          isPending={isSubmitting}
          initialValues={editingExpert ?? undefined}
        />
      )}
    </CustomLayoutBorder>
  );
};

import { useParams } from "react-router-dom";
import { DataTable, type Column } from "@/shared/components/DataTable";
import { HeaderSessionsTable } from "./components/HeaderSessionsTable";
import { TableSessionsActions } from "./components/TableSessionsActions";

import LoadingPage from "@/shared/components/LoadingPage";
import { EmptyTable } from "@/shared/components/EmptyTable";
import { useGetCassaionSessionTable } from "./api/hooks/useGetCassaionSessionTable";
import { useCreateCassaionSessionTable } from "./api/hooks/useCreateCassaionSessionTable";
import { useUpdateCassaionSessionTable } from "./api/hooks/useUpdateCassaionSessionTable";
import { useRemoveCassaionSessionTable } from "./api/hooks/useRemoveCassaionSessionTable";
import {
  formatDateToTime,
  formatDateToYYYYMMDD,
} from "@/shared/utils/convertDate";
import { useGetFirstInstanceSessionTable } from "./api/hooks/useGetFirstInstanceSessionTable";
import { useGetAppealSessionTable } from "./api/hooks/useGetAppealSessionTable";
import { useIndexedData } from "@/shared/utils/useIndexedData";
import { useState } from "react";
import { useCreateFirstInstanceSessionTable } from "./api/hooks/useCreateFirstInstanceSessionTable";
import { useCreateAppealSessionTable } from "./api/hooks/useCreateAppealSessionTable";
import { useUpdateFirstInstanceSessionTable } from "./api/hooks/useUpdateFirstInstanceSessionTable";
import { useUpdateAppealSessionTable } from "./api/hooks/useUpdateAppealSessionTable";
import { useRemoveFirstInstanceSessionTable } from "./api/hooks/useRemoveFirstInstanceSessionTable";
import { useRemoveAppealSessionTable } from "./api/hooks/useRemoveAppealSessionTable";
import { Pagination } from "@/shared/components/Pagination";
import { CustomLayoutBorder } from "@/shared/components/CustomLayoutBorder";

interface SessionRow {
  id?: number;
  rowNumber?: number;
  session_date: string;
  court_id: number;
  hall_floor: number;
  hall_number: number;
  court?: {
    name?: string;
  };
}

export const SesstionsFooter = ({ tab }: { tab: string }) => {
  const { id } = useParams<{ id: string }>();
  const [pageByTab, setPageByTab] = useState<Record<string, number>>({
    cassation: 1,
    first_instance: 1,
    appeal: 1,
  });
  const isCassationTab = tab === "cassation";
  const isFirstInstanceTab = tab === "first_instance";
  const isAppealTab = tab === "appeal";
  const page = pageByTab[tab] ?? 1;
  const setPage = (nextPage: number) => {
    setPageByTab((previous) => ({
      ...previous,
      [tab]: nextPage,
    }));
  };

  const { data: cassationData, isPending } = useGetCassaionSessionTable(
    Number(id),
    page,
    3,
    isCassationTab,
  );
  const { data: firstInstanceData, isPending: isPendingFirstInstance } =
    useGetFirstInstanceSessionTable(Number(id), page, 3, isFirstInstanceTab);
  const { data: appealData, isPending: isPendingAppeal } =
    useGetAppealSessionTable(Number(id), page, 3, isAppealTab);

  const totalPages =
    cassationData?.meta?.lastpage ??
    cassationData?.meta?.lastPage ??
    cassationData?.meta?.last_page ??
    1;
  const totalPagesFirstInstance =
    firstInstanceData?.meta?.lastPage ??
    firstInstanceData?.meta?.last_page ??
    1;
  const totalPagesAppeal =
    appealData?.meta?.lastPage ?? appealData?.meta?.last_page ?? 1;

  const currentTotalPages = isCassationTab
    ? totalPages
    : isFirstInstanceTab
      ? totalPagesFirstInstance
      : totalPagesAppeal;

  const indexdCassationData = useIndexedData(cassationData?.data, page, 3);
  const indexdFirstInstanceData = useIndexedData(
    firstInstanceData?.data,
    page,
    3,
  );
  const indexdAppealData = useIndexedData(appealData?.data, page, 3);

  const currentData = isCassationTab
    ? indexdCassationData
    : isFirstInstanceTab
      ? indexdFirstInstanceData
      : indexdAppealData;

  const isCurrentTabPending = isCassationTab
    ? isPending
    : isFirstInstanceTab
      ? isPendingFirstInstance
      : isPendingAppeal;

  const { mutateAsync: createMutationCassation } =
    useCreateCassaionSessionTable();
  const { mutateAsync: createMutationFirstInstance } =
    useCreateFirstInstanceSessionTable();
  const { mutateAsync: createMutationAppeal } = useCreateAppealSessionTable();

  const { mutateAsync: updateMutationCassation } =
    useUpdateCassaionSessionTable();
  const { mutateAsync: updateMutationFirstInstance } =
    useUpdateFirstInstanceSessionTable();
  const { mutateAsync: updateMutationAppeal } = useUpdateAppealSessionTable();

  const { mutateAsync: deleteMutationCassation } =
    useRemoveCassaionSessionTable();
  const { mutateAsync: deleteMutationFirstInstance } =
    useRemoveFirstInstanceSessionTable();
  const { mutateAsync: deleteMutationAppeal } = useRemoveAppealSessionTable();

  const handleAdd = (values: SessionRow) => {
    if (tab === "cassation") {
      createMutationCassation({
        caseId: Number(id),
        data: values,
      });
    } else if (tab === "first_instance") {
      createMutationFirstInstance({
        caseId: Number(id),
        data: values,
      });
    } else if (tab === "appeal") {
      createMutationAppeal({
        caseId: Number(id),
        data: values,
      });
    }
  };

  const handleUpdate = (values: SessionRow) => {
    if (!values.id) return;

    if (tab === "cassation") {
      updateMutationCassation({
        sessionId: values.id,
        data: values,
      });
    } else if (tab === "first_instance") {
      updateMutationFirstInstance({
        sessionId: values.id,
        data: values,
      });
    } else if (tab === "appeal") {
      updateMutationAppeal({
        sessionId: values.id,
        data: values,
      });
    }
  };

  const handleDelete = (session: SessionRow) => {
    if (!session.id) return;

    if (tab === "cassation") {
      deleteMutationCassation(session.id);
    } else if (tab === "first_instance") {
      deleteMutationFirstInstance(session.id);
    } else if (tab === "appeal") {
      deleteMutationAppeal(session.id);
    }
  };

  const columns: Column<SessionRow>[] = [
    {
      header: "#",
      accessor: (item) => item.rowNumber,
      headerClassName: "w-16",
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
      header: "المحكمة",
      accessor: (item) => item.court?.name || "-",
    },
    {
      header: "دور القاعة",
      accessor: (item) => item.hall_floor,
    },
    {
      header: "رقم القاعة",
      accessor: (item) => item.hall_number,
    },
    {
      header: "إجراء",
      accessor: (item) => (
        <TableSessionsActions
          item={item}
          onEdit={handleUpdate}
          onDelete={() => handleDelete(item)}
          tab={tab}
        />
      ),
    },
  ];

  if (isCurrentTabPending) return <LoadingPage />;

  return (
    <CustomLayoutBorder>
      <HeaderSessionsTable
        title={
          tab === "first_instance"
            ? "جلسات أول درجة"
            : tab === "appeal"
              ? "جلسات الاستئناف"
              : "جلسات التمييز"
        }
        onAdd={handleAdd}
      />
      {currentData && currentData.length > 0 ? (
        <>
          <div className="max-w-full overflow-x-auto">
            <DataTable data={currentData} columns={columns} rowKey="id" />
          </div>
          {currentTotalPages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={currentTotalPages}
              onPageChange={setPage}
            />
          )}
        </>
      ) : (
        <EmptyTable message="لا توجد جلسات لعرضها" />
      )}
    </CustomLayoutBorder>
  );
};

import { useParams } from "react-router-dom";
import { DataTable, type Column } from '@/shared/components/DataTable';
import { HeaderSessionsTable } from './components/HeaderSessionsTable';
import { TableSessionsActions } from './components/TableSessionsActions';

import LoadingPage from '@/shared/components/LoadingPage';
import { EmptyTable } from '@/shared/components/EmptyTable';
import { useGetCassaionSessionTable } from "./api/hooks/useGetCassaionSessionTable";
import { useCreateCassaionSessionTable } from "./api/hooks/useCreateCassaionSessionTable";
import { useUpdateCassaionSessionTable } from "./api/hooks/useUpdateCassaionSessionTable";
import { useRemoveCassaionSessionTable } from "./api/hooks/useRemoveCassaionSessionTable";
import { formatDateToTime, formatDateToYYYYMMDD } from "@/shared/utils/convertDate";
import { useGetFirstInstanceSessionTable } from "./api/hooks/useGetFirstInstanceSessionTable";
import { useGetAppealSessionTable } from "./api/hooks/useGetAppealSessionTable";
import { useIndexedData } from "@/shared/utils/useIndexedData";
import { useState, useEffect } from "react";
import { useCreateFirstInstanceSessionTable } from "./api/hooks/useCreateFirstInstanceSessionTable";
import { useCreateAppealSessionTable } from "./api/hooks/useCreateAppealSessionTable";
import { useUpdateFirstInstanceSessionTable } from "./api/hooks/useUpdateFirstInstanceSessionTable";
import { useUpdateAppealSessionTable } from "./api/hooks/useUpdateAppealSessionTable";
import { useRemoveFirstInstanceSessionTable } from "./api/hooks/useRemoveFirstInstanceSessionTable";
import { useRemoveAppealSessionTable } from "./api/hooks/useRemoveAppealSessionTable";
import { Pagination } from "@/shared/components/Pagination";


export const SesstionsFooter = ({ tab }: { tab: string }) => {


    const { id } = useParams<{ id: string }>();
    const [page, setPage] = useState<number>(1);

    useEffect(() => {
        setPage(1);
    }, [tab]);
    const { data: cassationData, isPending } = useGetCassaionSessionTable(Number(id), page, 3);
    const { data: firstInstanceData, isPending: isPendingFirstInstance } = useGetFirstInstanceSessionTable(Number(id), page, 3);
    const { data: appealData, isPending: isPendingAppeal } = useGetAppealSessionTable(Number(id), page, 3);

    const totalPages = cassationData?.meta?.lastPage ?? cassationData?.meta?.last_page ?? 1;
    const totalPagesFirstInstance = firstInstanceData?.meta?.lastPage ?? firstInstanceData?.meta?.last_page ?? 1;
    const totalPagesAppeal = appealData?.meta?.lastPage ?? appealData?.meta?.last_page ?? 1;

    const currentTotalPages = tab === "cassation" ? totalPages : tab === "first_instance" ? totalPagesFirstInstance : totalPagesAppeal;


    const indexdCassationData = useIndexedData(cassationData?.data, page, 3);
    const indexdFirstInstanceData = useIndexedData(firstInstanceData?.data, page, 3);
    const indexdAppealData = useIndexedData(appealData?.data, page, 3);

    const { mutateAsync: createMutationCassation, isPending: isPendingCreateCassation } = useCreateCassaionSessionTable();
    const { mutateAsync: createMutationFirstInstance, isPending: isPendingCreateFirstInstance } = useCreateFirstInstanceSessionTable();
    const { mutateAsync: createMutationAppeal, isPending: isPendingCreateAppeal } = useCreateAppealSessionTable();

    const { mutateAsync: updateMutationCassation, isPending: isPendingUpdateCassation } = useUpdateCassaionSessionTable();
    const { mutateAsync: updateMutationFirstInstance, isPending: isPendingUpdateFirstInstance } = useUpdateFirstInstanceSessionTable();
    const { mutateAsync: updateMutationAppeal, isPending: isPendingUpdateAppeal } = useUpdateAppealSessionTable();

    const { mutateAsync: deleteMutationCassation, isPending: isPendingDeleteCassation } = useRemoveCassaionSessionTable();
    const { mutateAsync: deleteMutationFirstInstance, isPending: isPendingDeleteFirstInstance } = useRemoveFirstInstanceSessionTable();
    const { mutateAsync: deleteMutationAppeal, isPending: isPendingDeleteAppeal } = useRemoveAppealSessionTable();

    const isPendingCreate = tab === "cassation" ? isPendingCreateCassation : tab === "first_instance" ? isPendingCreateFirstInstance : isPendingCreateAppeal;
    const isPendingUpdate = tab === "cassation" ? isPendingUpdateCassation : tab === "first_instance" ? isPendingUpdateFirstInstance : isPendingUpdateAppeal;
    const isPendingDelete = tab === "cassation" ? isPendingDeleteCassation : tab === "first_instance" ? isPendingDeleteFirstInstance : isPendingDeleteAppeal;

    const handleAdd = (values: any) => {
        if (tab === "cassation") {
            createMutationCassation({
                caseId: Number(id),
                data: values
            });
        } else if (tab === "first_instance") {
            createMutationFirstInstance({
                caseId: Number(id),
                data: values
            });
        } else if (tab === "appeal") {
            createMutationAppeal({
                caseId: Number(id),
                data: values
            });
        }
    };

    const handleUpdate = (values: any) => {
        if (tab === "cassation") {
            updateMutationCassation({
                sessionId: values.id,
                data: values
            });
        } else if (tab === "first_instance") {
            updateMutationFirstInstance({
                sessionId: values.id,
                data: values
            });
        } else if (tab === "appeal") {
            updateMutationAppeal({
                sessionId: values.id,
                data: values
            });
        }
    };

    const handleDelete = (session: any) => {

        if (tab === "cassation") {
            deleteMutationCassation(session.id);
        } else if (tab === "first_instance") {
            deleteMutationFirstInstance(session.id);
        } else if (tab === "appeal") {
            deleteMutationAppeal(session.id);
        }

    };

    const columns: Column<any>[] = [
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
            accessor: (item) => item.court.name,
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
                />
            ),
        },
    ];

    if (isPending || isPendingFirstInstance || isPendingAppeal) return <LoadingPage />;

    return (
        <div className="bg-white rounded-2xl p-4 md:p-6 border border-[#eeeeee]">
            <HeaderSessionsTable
                title={tab === "first_instance" ? "جلسات أول درجة" : tab === "appeal" ? "جلسات الاستئناف" : "جلسات التمييز"}
                onAdd={handleAdd}
            />
            {indexdCassationData && tab === "cassation" && indexdCassationData.length > 0 || indexdFirstInstanceData && tab === "first_instance" && indexdFirstInstanceData.length > 0 || indexdAppealData && tab === "appeal" && indexdAppealData.length > 0 ? (
                <>
                    <div className="max-w-full overflow-x-auto">
                        <DataTable
                            data={tab === "cassation" ? indexdCassationData : tab === "first_instance" ? indexdFirstInstanceData : indexdAppealData}
                            columns={columns}
                            rowKey="id"
                        />
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
        </div>
    );
};


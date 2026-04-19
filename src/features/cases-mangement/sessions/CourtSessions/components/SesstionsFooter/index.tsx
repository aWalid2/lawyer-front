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


export const SesstionsFooter = ({ tab }: { tab: string }) => {
    const { id } = useParams<{ id: string }>();
    const { data: cassationData, isPending } = useGetCassaionSessionTable(Number(id));

    const { mutateAsync: createMutationCassation } = useCreateCassaionSessionTable();
    const { mutateAsync: updateMutationCassation } = useUpdateCassaionSessionTable();
    const { mutateAsync: deleteMutationCassation } = useRemoveCassaionSessionTable();


    const handleAdd = (values: any) => {
        if (tab === "cassation") {
            createMutationCassation({
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
        }
    };

    const handleDelete = (session: any) => {

        if (tab === "cassation") {
            deleteMutationCassation(session.id);
        }

    };

    const columns: Column<any>[] = [
        {
            header: "#",
            accessor: (item) => item.rowIndex,
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
            accessor: (item) => item.court_id,
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

    if (isPending) return <LoadingPage />;

    return (
        <div className="bg-white rounded-2xl p-4 md:p-6 border border-[#eeeeee]">
            <HeaderSessionsTable
                title={tab === "first_instance" ? "جلسات أول درجة" : tab === "appeal" ? "جلسات الاستئناف" : "جلسات التمييز"}
                onAdd={handleAdd}
            />
            {cassationData && cassationData.length > 0 ? (
                <div className="max-w-full overflow-x-auto">
                    <DataTable
                        data={tab === "cassation" && cassationData ? cassationData : []}
                        columns={columns}
                        rowKey="id"
                    />
                </div>
            ) : (
                <EmptyTable message="لا توجد جلسات لعرضها" />
            )}
        </div>
    );
};


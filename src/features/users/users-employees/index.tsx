import React, { useMemo, useState } from "react";
import { DataTable, type Column } from "@/shared/components/DataTable";
import { Pagination } from "@/shared/components/Pagination";
import { HeaderEmployees } from "./employees/HeaderEmployees";
import { EmployeesAction } from "./employees/EmployeesAction";
import { Editemployees } from "./employees/EditEmployees";
import { useFetchEmployees } from "./employees/api/hooks/useGetAllEmployees";
import type { Employee } from "./employees/types";
import LoadingPage from "@/shared/components/LoadingPage";
import { Error } from "@/shared/components/Error";
import { EmptyTable } from "@/shared/components/EmptyTable";
import { useIndexedData } from "@/shared/utils/useIndexedData";

type IndexedEmployee = Employee & { rowNumber: number };

export const UsersEmployee: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 15;

  const { data: employees, isPending, isError, refetch } = useFetchEmployees();

  const employeesData = useMemo(() => employees || [], [employees]);

  const totalPages = Math.max(1, Math.ceil(employeesData.length / limit));

  const paginatedEmployees = useMemo(() => {
    const startIndex = (page - 1) * limit;
    return employeesData.slice(startIndex, startIndex + limit);
  }, [employeesData, page, limit]);

  const indexedEmployeesData = useIndexedData(
    paginatedEmployees,
    page,
    limit,
  ) as IndexedEmployee[];

  React.useEffect(() => {
    setPage(1);
  }, [employeesData.length, limit]);

  const columns: Column<IndexedEmployee>[] = [
    {
      header: "#",
      accessor: (item) => item.rowNumber,
      headerClassName: "w-13",
      className: "w-13 text-center font-medium",
    },
    {
      header: "اسم الموظف",
      accessor: (item) => item.user.first_name,
      headerClassName: "w-50",
      className: "w-50 font-medium",
    },
    {
      header: "رقم الهاتف",
      accessor: (item) => (
        <div className="flex items-center justify-center" dir="ltr">
          <span className="text-left">{item.user.phone}</span>
        </div>
      ),
      headerClassName: "w-40",
      className: "w-40 text-center",
    },
    {
      header: "البريد الإلكتروني",
      accessor: (item) => (
        <div className="flex items-center justify-center" dir="ltr">
          <span className="text-left text-sm text-gray-600">
            {item.user.email}
          </span>
        </div>
      ),
      headerClassName: "w-50",
      className: "w-50 text-center",
    },
    {
      header: "الوظيفة",
      accessor: (item) => (
        <span className="flex items-center justify-center" dir="ltr">
          {item.position || "-"}
        </span>
      ),
      headerClassName: "w-45",
      className: "w-45 text-center",
    },
    {
      header: "الإجراءات",
      accessor: (item) => (
        <EmployeesAction
          caseItem={item}
          onEmployeeUpdated={() => {
            refetch();
          }}
        />
      ),
      headerClassName: "w-35 text-center",
      className: "w-34 text-center",
    },
  ];

  if (isPending) return <LoadingPage />;
  if (isError) return <Error message="حدث خطأ في تحميل البيانات" />;

  return (
    <div className="space-y-6">
      <HeaderEmployees onAddClick={() => setIsAddModalOpen(true)} />

      <DataTable
        data={indexedEmployeesData}
        columns={columns}
        rowIdField="user_id"
      />

      {employeesData.length > 0 ? (
        totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        )
      ) : (
        <EmptyTable message="لا يوجد موظفين لعرضهم" />
      )}

      <Editemployees open={isAddModalOpen} onOpenChange={setIsAddModalOpen} />
    </div>
  );
};

import React from "react";
import { CustomLayoutBorder } from "@/shared/components/CustomLayoutBorder";
import { DataTable, type Column } from "@/shared/components/DataTable";
import { EmptyTable } from "@/shared/components/EmptyTable";
import { Error } from "@/shared/components/Error";
import { Pagination } from "@/shared/components/Pagination";
import LoadingPage from "@/shared/components/LoadingPage";
import { CaseEmployeeDetailsDialog } from "./components/CaseEmployeeDetailsDialog";
import { CaseEmployeeDialog } from "./components/CaseEmployeeDialog";
import { EmployeesActions } from "./components/EmployeesActions";
import { HeaderEmployee } from "./components/HeaderEmployee";
import { useEmployeesTable } from "./hooks/useEmployeesTable";
import type { CaseEmployee } from "./types";
import { getCaseEmployeeName } from "./types";

export const EmployeesTable: React.FC = () => {
  const {
    page,
    setPage,
    selectedEmployee,
    isFormOpen,
    isViewOpen,
    isPending,
    isError,
    error,
    indexedEmployeesData,
    totalPages,
    employeeOptions,
    handleSave,
    handleDelete,
    handleOpenView,
    handleFormOpenChange,
    handleViewOpenChange,
    handleEditFromView,
    isOptionsPending,
    isCreatePending,
    isSubmitting,
  } = useEmployeesTable();

  if (isPending) return <LoadingPage />;
  if (isError) {
    return <Error message="حدث خطأ أثناء جلب موظفي القضية." error={error} />;
  }

  const columns: Column<CaseEmployee>[] = [
    {
      header: "#",
      accessor: (item) => item.rowNumber,
      headerClassName: "w-[60px]",
    },
    {
      header: "اسم الموظف",
      accessor: (item) => getCaseEmployeeName(item),
    },
    {
      header: "رقم الهاتف",
      accessor: "phone",
    },
    {
      header: "الوظيفة",
      accessor: "job",
    },
    {
      header: "إجراء",
      accessor: (item) => (
        <EmployeesActions
          employee={item}
          onView={() => handleOpenView(item.id)}
          onDelete={() => handleDelete(item.id)}
        />
      ),
    },
  ];

  return (
    <CustomLayoutBorder>
      <HeaderEmployee
        title="الموظفين"
        buttonText="تعيين موظف"
        employeeOptions={employeeOptions}
        onSave={handleSave}
        isOptionsPending={isOptionsPending}
        isPending={isCreatePending}
      />

      <div className="overflow-hidden">
        {indexedEmployeesData.length === 0 ? (
          <EmptyTable message="لا يوجد موظفين مرتبطين بهذه القضية" />
        ) : (
          <>
            <DataTable
              data={indexedEmployeesData}
              columns={columns}
              rowIdField="id"
            />
            {totalPages > 1 && (
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            )}
          </>
        )}
      </div>

      {isFormOpen && (
        <CaseEmployeeDialog
          open={isFormOpen}
          onOpenChange={handleFormOpenChange}
          employee={selectedEmployee}
          employeeOptions={employeeOptions}
          isOptionsPending={isOptionsPending}
          onSave={handleSave}
          isPending={isSubmitting}
        />
      )}

      {selectedEmployee && (
        <CaseEmployeeDetailsDialog
          open={isViewOpen}
          onOpenChange={handleViewOpenChange}
          employee={selectedEmployee}
          onEdit={handleEditFromView}
        />
      )}
    </CustomLayoutBorder>
  );
};

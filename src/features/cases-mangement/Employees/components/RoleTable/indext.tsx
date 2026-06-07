import React from "react";
import { CustomLayoutBorder } from "@/shared/components/CustomLayoutBorder";
import { DataTable, type Column } from "@/shared/components/DataTable";
import { EmptyTable } from "@/shared/components/EmptyTable";
import { Error } from "@/shared/components/Error";
import { Pagination } from "@/shared/components/Pagination";
import LoadingPage from "@/shared/components/LoadingPage";
import { CaseRoleDetailsDialog } from "./components/CaseRoleDetailsDialog";
import { CaseRoleDialog } from "./components/CaseRoleDialog";
import { RolesActions } from "./components/RoleActions";
import { HeaderRole } from "./components/HeaderRole";
import { useRolesTable } from "./hooks/useRolesTable";
import type { CaseEmployee } from "./types";
import { getCaseEmployeeName } from "./types";

export const RoleTable: React.FC = () => {
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
  } = useRolesTable();

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
        <RolesActions
          employee={item}
          onView={() => handleOpenView(item.id)}
          onDelete={() => handleDelete(item.id)}
        />
      ),
    },
  ];

  return (
    <CustomLayoutBorder>
      <HeaderRole
        title="الدور"
        buttonText="تعيين دور"
        employeeOptions={employeeOptions}
        onSave={handleSave}
        isOptionsPending={isOptionsPending}
        isPending={isCreatePending}
      />

      <div className="overflow-hidden">
        {indexedEmployeesData.length === 0 ? (
          <EmptyTable message="لا يوجد أدور مرتبطين بهذه القضية" />
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
        <CaseRoleDialog
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
        <CaseRoleDetailsDialog
          open={isViewOpen}
          onOpenChange={handleViewOpenChange}
          employee={selectedEmployee}
          onEdit={handleEditFromView}
        />
      )}
    </CustomLayoutBorder>
  );
};

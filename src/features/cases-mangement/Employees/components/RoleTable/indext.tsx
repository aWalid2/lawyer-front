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
import type { CaseRole } from "./types";
import { getCaseRoleName, getCaseRoleEmployeeCount } from "./types";

export const RoleTable: React.FC = () => {
  const {
    page,
    setPage,
    selectedRole,
    isFormOpen,
    isViewOpen,
    isPending,
    isError,
    error,
    indexedRolesData,
    totalPages,
    roleOptions,
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
    return <Error message="حدث خطأ أثناء جلب الأدوار." error={error} />;
  }

  const columns: Column<CaseRole>[] = [
    {
      header: "#",
      accessor: (item) => item.rowNumber,
      headerClassName: "w-[60px]",
    },
    {
      header: "اسم الدور",
      accessor: (item) => getCaseRoleName(item),
    },
    {
      header: "عدد الموظفين داخل الدور",
      accessor: (item) => getCaseRoleEmployeeCount(item),
    },
    {
      header: "إجراء",
      accessor: (item) => (
        <RolesActions
          role={item}
          onView={() => handleOpenView(item.role_id)}
          onDelete={() => handleDelete(item.role_id)}
        />
      ),
    },
  ];

  return (
    <CustomLayoutBorder>
      <HeaderRole
        title="الدور"
        buttonText="تعيين دور"
        roleOptions={roleOptions}
        onSave={handleSave}
        isOptionsPending={isOptionsPending}
        isPending={isCreatePending}
      />

      <div className="overflow-hidden">
        {indexedRolesData.length === 0 ? (
          <EmptyTable message="لا يوجد أدوار مرتبطين بهذه القضية" />
        ) : (
          <>
            <DataTable
              data={indexedRolesData}
              columns={columns}
              rowIdField="role_id"
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
          roleOptions={roleOptions}
          isOptionsPending={isOptionsPending}
          onSave={handleSave}
          isPending={isSubmitting}
          editRole={selectedRole}
        />
      )}

      {selectedRole && (
        <CaseRoleDetailsDialog
          open={isViewOpen}
          onOpenChange={handleViewOpenChange}
          role={selectedRole}
          onEdit={handleEditFromView}
        />
      )}
    </CustomLayoutBorder>
  );
};

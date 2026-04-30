import React, { useState } from "react";
import { Plus } from "lucide-react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { LayoutDialog } from "@/shared/components/LayoutDialog";
import { DataTable, type Column } from "@/shared/components/DataTable";
import { HeaderActionButton } from "@/shared/components/HeaderActionButton";
import { TableEditButton } from "@/shared/components/TableEditButton";
import { TableDeleteButton } from "@/shared/components/TableDeleteButton";
import { ConfirmDeleteDialog } from "@/shared/components/ConfirmDeleteDialog";
import { InputForm } from "@/shared/components/InputForm";
import type { CourtT, court_circle } from "../types/courtTypes";
import { EmptyTable } from "@/shared/components/EmptyTable";
import { useIndexedData } from "@/shared/utils/useIndexedData";
import { useGetCircles } from "../api/hooks/useGetCircles";
import { useCreateCircle } from "../api/hooks/useCreateCircle";
import { useUpdateCircle } from "../api/hooks/useUpdateCircle";
import { useDeleteCircle } from "../api/hooks/useDeleteCircle";
import LoadingPage from "@/shared/components/LoadingPage";
import { Error } from "@/shared/components/Error";
import { PaginationApi } from "@/shared/components/PaginationApi";

// ---------- inner form dialog ----------
interface DistrictFormDialogProps {
  district?: court_circle;
  onSave: (values: { name: string }) => void;
  trigger: React.ReactNode;
  isPending?: boolean;
}

const DistrictFormDialog: React.FC<DistrictFormDialogProps> = ({
  district,
  onSave,
  trigger,
  isPending,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <LayoutDialog
      open={open}
      onOpenChange={setOpen}
      title={district ? "تعديل دائرة" : "أضافة دائرة جديدة"}
      trigger={trigger}
      size="sm"
    >
      <Formik
        initialValues={{ name: district?.name || "" }}
        validationSchema={Yup.object().shape({
          name: Yup.string().required("اسم الدائرة مطلوب"),
        })}
        onSubmit={(values) => {
          onSave(values);
          setOpen(false);
        }}
        enableReinitialize
      >
        {() => (
          <Form className="space-y-4 py-4">
            <InputForm
              label="اسم الدائرة"
              name="name"
              type="text"
              placeholder="اسم الدائرة"
            />
            <button
              type="submit"
              disabled={isPending}
              className="bg-primary-gradient rounded-main mt-4 h-12.5 w-full px-8 py-2.5 font-bold text-white shadow-lg transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {isPending
                ? "جاري الحفظ..."
                : district
                  ? "تعديل دائرة"
                  : "إضافة دائرة"}
            </button>
          </Form>
        )}
      </Formik>
    </LayoutDialog>
  );
};

// ---------- main dialog ----------
interface DistrictsDialogProps {
  court: CourtT;
  trigger: React.ReactNode;
}

export const DistrictsDialog: React.FC<DistrictsDialogProps> = ({
  court,
  trigger,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);

  // Only fetch when the dialog is actually open
  const {
    data: districts,
    isPending,
    isError,
  } = useGetCircles(Number(court.id), isOpen);
  console.log(districts);
  const { mutate: createCircle, isPending: isCreating } = useCreateCircle();
  const { mutate: updateCircle, isPending: isUpdating } = useUpdateCircle();
  const { mutate: deleteCircle, isPending: isDeleting } = useDeleteCircle();

  const indexedData = useIndexedData(districts || []);
  const totalPages = districts?.meta?.total_pages ?? 1;

  const columns: Column<court_circle>[] = [
    {
      header: "#",
      accessor: (district: court_circle) => district.rowNumber,
    },
    {
      header: "اسم الدائرة",
      accessor: "name" as keyof court_circle,
      className: "w-[500px]",
    },
    {
      header: "الإجراءات",
      accessor: (district: court_circle) => (
        <div className="flex items-center justify-center gap-2">
          <DistrictFormDialog
            district={district}
            isPending={isUpdating}
            onSave={(val) =>
              updateCircle({
                id: Number(district.id),
                data: { name: val.name },
              })
            }
            trigger={<TableEditButton />}
          />
          <ConfirmDeleteDialog
            title="حذف الدائرة"
            description={`هل أنت متأكد من حذف دائرة "${district.name}"؟`}
            onConfirm={() => deleteCircle({ id: Number(district.id) })}
            trigger={<TableDeleteButton disabled={isDeleting} />}
          />
        </div>
      ),
    },
  ];

  return (
    <LayoutDialog
      title={`دوائر ${court.name}`}
      trigger={trigger}
      open={isOpen}
      onOpenChange={setIsOpen}
      size="2xl"
    >
      <div className="flex flex-col gap-6">
        <div className="flex h-10 justify-end rounded-lg px-6 text-sm">
          <DistrictFormDialog
            isPending={isCreating}
            onSave={(val) =>
              createCircle({ name: val.name, court_id: Number(court.id) })
            }
            trigger={
              <HeaderActionButton
                label="دائرة جديدة"
                icon={<Plus size={16} />}
                variant="gradient"
                className="h-10 rounded-lg px-8 text-sm"
              />
            }
          />
        </div>

        {isPending ? (
          <LoadingPage />
        ) : isError ? (
          <Error message="حدث خطأ في تحميل البيانات" />
        ) : indexedData?.length > 0 ? (
          <DataTable data={indexedData} columns={columns} rowIdField="id" />
        ) : (
          <EmptyTable message="لا يوجد دوائر" />
        )}

        {indexedData?.length > 0 && totalPages > 1 && (
          <PaginationApi
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        )}
      </div>
    </LayoutDialog>
  );
};

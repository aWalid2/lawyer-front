import React from "react";
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
import type { CourtT, court_sessions } from "../types/courtTypes";
import { EmptyTable } from "@/shared/components/EmptyTable";

interface DistrictFormDialogProps {
  district?: court_sessions;
  onSave: (values: { name: string }) => void;
  trigger: React.ReactNode;
}

const DistrictFormDialog: React.FC<DistrictFormDialogProps> = ({
  district,
  onSave,
  trigger,
}) => {
  return (
    <LayoutDialog
      title={district ? "تعديل دائرة" : "أضافة دائرة جديدة"}
      trigger={trigger}
      className="sm:max-w-[500px]"
    >
      <Formik
        initialValues={{ name: district?.name || "" }}
        validationSchema={Yup.object().shape({
          name: Yup.string().required("اسم الدائرة مطلوب"),
        })}
        onSubmit={(values) => onSave(values)}
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
              className="bg-primary-gradient text-white px-8 py-2.5 w-full mt-4 rounded-main font-bold shadow-lg hover:opacity-90 transition-opacity h-12.5"
            >
              {district ? "تعديل دائرة" : "إضافة دائرة"}
            </button>
          </Form>
        )}
      </Formik>
    </LayoutDialog>
  );
};

interface DistrictsDialogProps {
  court: CourtT;
  trigger: React.ReactNode;
}

export const DistrictsDialog: React.FC<DistrictsDialogProps> = ({
  court,
  trigger,
}) => {
  const columns: Column<court_sessions>[] = [
    {
      header: "#",
      accessor: (district: court_sessions) => court.court_sessions.indexOf(district) + 1,
    },
    {
      header: "اسم الدائرة",
      accessor: "name" as keyof court_sessions,
      className: "w-[500px]",
    },
    {
      header: "الحالة",
      accessor: (district: court_sessions) => (
        <div className="flex items-center gap-2 justify-center">
          <DistrictFormDialog
            district={district}
            onSave={(val: { name: string }) =>
              console.log("Update district", district.id, val)
            }
            trigger={<TableEditButton />}
          />
          <ConfirmDeleteDialog
            title="حذف الدائرة"
            description={`هل أنت متأكد من حذف دائرة "${district.name}"؟`}
            onConfirm={() => console.log("Delete district", district.id)}
            trigger={<TableDeleteButton />}
          />
        </div>
      ),
    },
  ];

  return (
    <LayoutDialog
      title={`دوائر ${court.name}`}
      trigger={trigger}
      className="sm:max-w-[950px]"
    >
      <div className="flex flex-col gap-6">
        <div className="flex justify-end h-10 px-6 rounded-lg text-sm">
          <DistrictFormDialog
            onSave={(val: { name: string }) => console.log("Add district", val)}
            trigger={
              <HeaderActionButton
                label="دائرة جديدة"
                icon={<Plus size={16} />}
                variant="gradient"
                className="h-10 px-8 rounded-lg text-sm"
              />
            }
          />
        </div>
        {court.court_sessions?.length > 0 ? (
          <DataTable data={court.court_sessions} columns={columns} rowIdField="id" />
        ) : (
          <EmptyTable message="لا يوجد دوائر" />
        )}
      </div>
    </LayoutDialog>
  );
};

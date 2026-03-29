import React from "react";
import { DataTable, type Column } from "@/shared/components/DataTable";
import { Pagination } from "@/shared/components/Pagination";
import type { OtherSession, OtherSessionFormValues } from "./typesOther";
import { AddOtherSessionDialog } from "./AddOtherSessionDialog";
import { OtherActions } from "./OtherActions";

export const OtherSessionsTable: React.FC = () => {
  const [sessions, setSessions] = React.useState<OtherSession[]>([
    {
      id: "1",
      sessionDate: "2024-03-15",
      sessionTime: "10:30",
      lawyer: "أحمد محمد",
      decision: "تم الحضور",
    },
  ]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(sessions.length / itemsPerPage);
  const currentData = React.useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sessions.slice(startIndex, startIndex + itemsPerPage);
  }, [sessions, currentPage]);

  const handleSave = (values: OtherSessionFormValues, id?: string) => {
    if (id) {
      setSessions((prev) =>
        prev.map((s) => (s.id === id ? { ...s, ...values } : s))
      );
    } else {
      const newSession = {
        id: (sessions.length + 1).toString(),
        ...values,
      };
      setSessions((prev) => [...prev, newSession]);
    }
  };

  const handleDelete = (id: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
  };

  const columns: Column<OtherSession>[] = [
    {
      header: "#",
      accessor: (item) =>
        (currentPage - 1) * itemsPerPage + currentData.indexOf(item) + 1,
      headerClassName: "w-[60px]",
    },
    {
      header: "وقت الجلسة",
      accessor: "sessionTime",
    },
    {
      header: "تاريخ الجلسة",
      accessor: "sessionDate",
    },
    {
      header: "المحامي المسؤول",
      accessor: "lawyer",
      className: "font-medium text-gray-800",
    },
    {
      header: "قرار الجلسة",
      accessor: "decision",
    },
    {
      header: "إجراء",
      accessor: (item) => (
        <OtherActions
          item={item}
          onDelete={handleDelete}
          onSave={(values) => handleSave(values, item.id)}
        />
      ),
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-4 md:p-6 border border-[#eeeeee]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6">
        <h1 className="text-[18px] font-semibold text-secondary font-cairo text-right w-full sm:w-auto">
          الجلسات الإدارية
        </h1>
        <AddOtherSessionDialog
          onSave={(values) => handleSave(values)}
          trigger={
            <button className="flex items-center justify-center gap-2 bg-[#CBA46226] rounded-md h-12.5 w-full sm:w-auto px-6 transition-all duration-200 hover:bg-[#CBA46240] text-[#CBA462] font-semibold font-cairo">
              + إضافة جلسة إدارية
            </button>
          }
        />
      </div>

      <div className="overflow-hidden">
        <DataTable data={currentData} columns={columns} rowIdField="id" />
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};

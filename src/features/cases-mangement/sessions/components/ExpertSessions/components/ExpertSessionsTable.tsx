import React from "react";
import { DataTable, type Column } from "@/components/shared/components/DataTable";
import { Pagination } from "@/components/shared/components/Pagination";
import type { ExpertSession, ExpertSessionFormValues } from "./typesExpert";
import { AddExpertSessionDialog } from "./AddExpertSessionDialog";
import { EditIcon } from "@/components/shared/icons/Edit";
import { TrashIcon } from "@/components/shared/icons/Trash";
import { ConfirmDeleteDialog } from "@/components/shared/components/ConfirmDeleteDialog";
import { HeaderExpertSessions } from "./HeaderExpertSessions";

export const ExpertSessionsTable: React.FC = () => {
  const [sessions, setSessions] = React.useState<ExpertSession[]>([
    {
      id: "1",
      sessionDate: "2024-03-15",
      sessionTime: "10:30",
      lawyer: "أحمد محمد",
      decision: "تم الحضور",
    },
  ]);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [editingSession, setEditingSession] = React.useState<ExpertSession | null>(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(sessions.length / itemsPerPage);
  const currentData = React.useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sessions.slice(startIndex, startIndex + itemsPerPage);
  }, [sessions, currentPage]);

  const handleSave = (values: ExpertSessionFormValues) => {
    if (editingSession) {
      setSessions((prev) =>
        prev.map((s) => (s.id === editingSession.id ? { ...s, ...values } : s))
      );
    } else {
      const newSession = {
        id: (sessions.length + 1).toString(),
        ...values,
      };
      setSessions((prev) => [...prev, newSession]);
    }
    setEditingSession(null);
  };

  const handleDelete = (id: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
  };

  const columns: Column<ExpertSession>[] = [
    {
      header: "#",
      accessor: (item) => sessions.findIndex((p) => p.id === item.id) + 1,
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
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => {
              setEditingSession(item);
              setIsDialogOpen(true);
            }}
            className="hover:scale-110 transition"
          >
            <EditIcon className="w-4 h-4 text-secondary" />
          </button>
          <ConfirmDeleteDialog
            title="حذف الجلسة"
            description={`هل أنت متأكد من حذف جلسة بتاريخ ${item.sessionDate}؟`}
            onConfirm={() => handleDelete(item.id)}
            trigger={
              <button className="hover:scale-110 transition">
                <TrashIcon className="w-4 h-4 text-red-500" />
              </button>
            }
          />
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-4 md:p-6 border border-[#eeeeee]">
      <HeaderExpertSessions />

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

      <AddExpertSessionDialog
        open={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setEditingSession(null);
        }}
        onSave={handleSave}
        initialValues={editingSession || undefined}
      />
    </div>
  );
};

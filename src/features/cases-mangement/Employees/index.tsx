import React from "react";
import { DataTable, type Column } from "@/components/shared/components/DataTable";
import { EmployeesActions } from "./EmployeesActions";

interface Employee {
    id: string;
    name: string;
    phone: string;
    job: string;
}

const mockData: Employee[] = [
    { id: "1", name: "محمد علي", phone: "073972983", job: "سكرتير" },
    { id: "2", name: "محمد علي", phone: "073972983", job: "محاسب" },
    { id: "3", name: "محمد علي", phone: "073972983", job: "محاسب" },
    { id: "4", name: "محمد علي", phone: "073972983", job: "محاسب" },
    { id: "5", name: "محمد علي", phone: "073972983", job: "محاسب" },
    { id: "6", name: "محمد علي", phone: "073972983", job: "محاسب" },
    { id: "7", name: "محمد علي", phone: "073972983", job: "محاسب" },
];

export const Employees: React.FC = () => {
    const columns: Column<Employee>[] = [
        {
            header: "#",
            accessor: (item) => mockData.findIndex((e) => e.id === item.id) + 1,
            headerClassName: "w-16",
        },
        {
            header: "اسم الموظف",
            accessor: "name",
            className: "font-medium text-black",
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
                    onEdit={(emp) => console.log("Edit", emp)}
                    onDelete={(emp) => console.log("Delete", emp)}
                    onView={(emp) => console.log("View", emp)}
                />
            ),
        },
    ];

    return (
        <div className="mt-4">
            <DataTable
                data={mockData}
                columns={columns}
                rowIdField="id"
            />
        </div>
    );
};

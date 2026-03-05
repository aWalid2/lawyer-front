import React from 'react'
import { HeaderRelationalCases } from './components/HeaderRelationalCases'
import { DataTable, type Column } from '@/components/shared/components/DataTable'
import { RelationalCasesActions } from './components/RelationalCasesActions';



interface RelationalCasesTypes {

}

interface CasesRelatedT {
    id: string;
    caseCode: string;
    autoNumber: string;
}

const mockData: CasesRelatedT[] = [
    { id: "1", caseCode: "محمد علي", autoNumber: "073972983" },
    { id: "2", caseCode: "محمد علي", autoNumber: "073972983" },
    { id: "3", caseCode: "محمد علي", autoNumber: "073972983" },
    { id: "4", caseCode: "محمد علي", autoNumber: "073972983" },
    { id: "5", caseCode: "محمد علي", autoNumber: "073972983" },
    { id: "6", caseCode: "محمد علي", autoNumber: "073972983" },

];

export const RelationalCases: React.FC<RelationalCasesTypes> = () => {

    const columns: Column<any>[] = [
        {
            header: "#",
            accessor: (item) => mockData.findIndex((e) => e.id === item.id) + 1,
            headerClassName: "w-16",
        },
        {
            header: "كود القضية",
            accessor: "caseCode",
        },
        {
            header: "الرقم الآلي",
            accessor: "autoNumber",
        },
        {
            header: "إجراء",
            accessor: (item) => (
                <RelationalCasesActions
                    caseItem={item}
                    onEdit={(caseItem) => console.log("Edit", caseItem)}
                    onView={(caseItem) => console.log("View", caseItem)}
                />
            ),
        },
    ];
    return (
        <div>
            <HeaderRelationalCases title="القضايا ذات الصلة" buttonTitle=" إضافة قضية مرتبطه" />
            <DataTable
                data={mockData}
                columns={columns}
                rowIdField="id"
            />
        </div>
    )
}

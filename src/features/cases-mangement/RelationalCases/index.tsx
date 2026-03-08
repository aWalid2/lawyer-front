import React from 'react'
import { HeaderRelationalCases } from './components/HeaderRelationalCases'
import { DataTable, type Column } from '@/components/shared/components/DataTable'
import { RelationalCasesActions } from './components/RelationalCasesActions';
import { Pagination } from '@/components/shared/components/Pagination';



interface CasesRelatedT {
    id: string;
    caseCode: string;
    autoNumber: string;
}

const mockData: CasesRelatedT[] = [
    { id: "1", caseCode: "#6341", autoNumber: "#6341" },
    { id: "2", caseCode: "#6341", autoNumber: "#6341" },
    { id: "3", caseCode: "#6341", autoNumber: "#6341" },
    { id: "4", caseCode: "#6341", autoNumber: "#6341" },
    { id: "5", caseCode: "#6341", autoNumber: "#6341" },
    { id: "6", caseCode: "#6341", autoNumber: "#6341" },

];

export const RelationalCases: React.FC = () => {

    const [currentPage, setCurrentPage] = React.useState(1);
    const itemsPerPage = 15;

    const totalPages = Math.ceil(mockData.length / itemsPerPage);

    const currentData = React.useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return mockData.slice(startIndex, startIndex + itemsPerPage);
    }, [currentPage]);

    const columns: Column<any>[] = [
        {
            header: "#",
            accessor: (item) => mockData.findIndex((e) => e.id === item.id) + 1,
            headerClassName: "w-13",
            className: "w-13",
        },
        {
            header: "كود القضية",
            accessor: "caseCode",
            headerClassName: "w-35",
            className: "w-35",
        },
        {
            header: "الرقم الآلي",
            accessor: "autoNumber",
            headerClassName: "w-35",
            className: "w-35",
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
            headerClassName: "w-35",
            className: "w-35",
        },
    ];
    return (
        <div>
            <HeaderRelationalCases title="القضايا ذات الصلة" />
            <DataTable
                data={currentData}
                columns={columns}
                rowIdField="id"
            />
            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            )}
        </div>
    )
}

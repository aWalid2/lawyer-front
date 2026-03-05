import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export interface Column<T> {
    header: string;
    accessor: keyof T | ((item: T) => React.ReactNode);
    className?: string;
    headerClassName?: string;
}

interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    onRowClick?: (item: T) => void;
    selectedId?: string | number;
    rowIdField: keyof T;
}

export const DataTable = <T,>({
    data,
    columns,
    onRowClick,
    selectedId,
    rowIdField,
}: DataTableProps<T>) => {
    return (
        <div className="bg-white overflow-hidden border-b border-[#F1F1F4] relative">
            <Table className="border-collapse ring-0 outline-none">
                <TableHeader className="bg-[#FCFCFC] sticky top-0 z-20">
                    <TableRow className="border-b border-[#F1F1F4] hover:bg-transparent">
                        {columns.map((column, index) => (
                            <TableHead
                                key={index}
                                className={`p-2 text-center text-sm font-semibold text-[#4B5675]  border-r border-[#F1F1F4] h-[37px] ${column.headerClassName || ""}`}
                            >
                                {column.header}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((item) => (
                        <TableRow
                            key={String(item[rowIdField])}
                            className={`cursor-pointer border-b border-[#F1F1F4] transition-colors last:border-b-0 ${selectedId === item[rowIdField] ? "bg-blue-50" : "hover:bg-gray-50 bg-white"
                                }`}
                            onClick={() => onRowClick?.(item)}
                        >
                            {columns.map((column, colIndex) => (
                                <TableCell
                                    key={colIndex}
                                    className={`p-3 h-[60px] text-center text-sm text-gray-600 border-r border-[#F1F1F4] ${column.className || ""}`}
                                >
                                    {typeof column.accessor === "function"
                                        ? column.accessor(item)
                                        : (item[column.accessor] as React.ReactNode)}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );

};

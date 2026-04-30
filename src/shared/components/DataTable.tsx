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
    header: React.ReactNode;
    accessor: keyof T | ((item: T, index: number) => React.ReactNode);
    className?: string;
    headerClassName?: string;
    colSpan?: number;
    hideHeader?: boolean;
}

interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    onRowClick?: (item: T) => void;
    selectedId?: string | number;
    rowKey?: keyof T | ((item: T) => string | number);
    rowIdField?: keyof T;
}

export const DataTable = <T,>({
    data,
    columns,
    onRowClick,
    selectedId,
    rowKey,
    rowIdField,
}: DataTableProps<T>) => {
    return (
        <div className="bg-table-bg overflow-hidden border-b border-border relative">
            <Table className="border-collapse ring-0 outline-none">
                <TableHeader className="bg-[#FCFCFC] dark:bg-primary/23 sticky top-0 z-20">
                    <TableRow className="border-b border-border hover:bg-transparent">
                        {columns.map((column, index) => {
                            if (column.hideHeader) return null;
                            return (
                                <TableHead
                                    key={index}
                                    colSpan={column.colSpan}
                                    className={`p-2 text-center text-sm font-semibold text-muted-foreground border-r border-border h-[37px] ${column.headerClassName || ""}`}
                                >
                                    {column.header}
                                </TableHead>
                            );
                        })}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.map((item, index) => {
                        const key = typeof rowKey === "function" ? rowKey(item) : String(item[rowKey as keyof T] ?? index);
                        const selectionField = rowIdField || (typeof rowKey !== "function" ? rowKey : undefined);
                        const isSelected = selectionField ? selectedId === item[selectionField] : false;

                        return (
                            <TableRow
                                key={key}
                                className={`cursor-pointer border-b border-border transition-colors last:border-b-0 ${isSelected ? "bg-primary/10" : "hover:bg-table-hover bg-table-bg"
                                    }`}
                                onClick={() => onRowClick?.(item)}
                            >
                                {columns.map((column, colIndex) => (
                                    <TableCell
                                        key={colIndex}
                                        className={`p-3 h-[60px] text-center text-sm text-card-foreground/80 border-r border-border ${column.className || ""}`}
                                    >
                                        {typeof column.accessor === "function"
                                            ? column.accessor(item, index)
                                            : (item[column.accessor] as React.ReactNode)}
                                    </TableCell>
                                ))}
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );

};

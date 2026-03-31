import { useMemo } from "react";

export const useIndexedData = (data: any[]) => {
    const indexedData = useMemo(() => {
        return (data ?? []).map((item: any, index: number) => ({
            ...item,
            rowNumber: index + 1,
        }));
    }, [data]);
    return indexedData;
}


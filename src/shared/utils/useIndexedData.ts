import { useMemo } from "react";

export const useIndexedData = (data: any[], page: number = 1, limit: number = 10) => {
    const indexedData = useMemo(() => {
        return (data ?? []).map((item: any, index: number) => ({
            ...item,
            rowNumber: ((page - 1) * limit) + index + 1

        }));
    }, [data, page, limit]);
    return indexedData;
}


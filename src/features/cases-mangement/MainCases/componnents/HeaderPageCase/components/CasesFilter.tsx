import { HeaderFilter } from "@/shared/components/Header/HeaderFilter";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import { useFetchCaseStatuses } from "@/features/settings/case-statuses/api/hooks/useGetCaseStatuses";

interface CasesFilterProps {
  onFilterChange: (status: string) => void;
}

interface ItemsState {
  items: { name: string; id: string | number }[];
}

type ItemsAction = {
  type: "ADD_ITEMS";
  payload: { name: string; id: string | number }[];
};

const itemsReducer = (state: ItemsState, action: ItemsAction): ItemsState => {
  switch (action.type) {
    case "ADD_ITEMS":
      return { items: [...state.items, ...action.payload] };
    default:
      return state;
  }
};

export const CasesFilter: React.FC<CasesFilterProps> = ({ onFilterChange }) => {
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [itemsState, dispatch] = useReducer(itemsReducer, { items: [] });

  const seenIdsRef = useRef(new Set<string>());

  const { data, isFetching: isLoading } = useFetchCaseStatuses(page, 15);

  useEffect(() => {
    if (data?.data?.length) {
      const newItems = data.data.filter(
        (item: { id: string | number }) =>
          !seenIdsRef.current.has(String(item.id)),
      );

      newItems.forEach((item: { id: string | number }) => {
        seenIdsRef.current.add(String(item.id));
      });

      if (newItems.length > 0) {
        dispatch({ type: "ADD_ITEMS", payload: newItems });
      }

      const totalPages = data?.meta?.total_pages ?? 1;
      setHasMore(page < totalPages);
    }
    setIsFetching(false);
  }, [data, page]);

  const handleScrollEnd = useCallback(() => {
    if (!hasMore || isFetching || isLoading) {
      return;
    }
    setIsFetching(true);
    setPage((p) => p + 1);
  }, [hasMore, isFetching, isLoading, page]);

  const options = useMemo(() => {
    const mappedOptions = itemsState.items.map((item) => ({
      label: item.name,
      value: String(item.id),
    }));
    return mappedOptions;
  }, [itemsState.items]);

  const finalOptions = [{ label: "الكل", value: "all" }, ...options];

  return (
    <HeaderFilter
      placeholder="اختر الحالة"
      options={finalOptions}
      onFilterChange={onFilterChange}
      onScrollEnd={handleScrollEnd}
    />
  );
};

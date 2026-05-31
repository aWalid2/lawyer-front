import { HeaderFilter } from "@/shared/components/HeaderFilter";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import { useGetCaseStatus } from "../../../api/hooks/useGetCaseStatus";

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

  const { data, isFetching: isLoading } = useGetCaseStatus(true, page, 15);

  useEffect(() => {
    console.log(
      "Data effect triggered. Page:",
      page,
      "Data length:",
      data?.data?.length,
    );
    if (data?.data?.length) {
      const newItems = data.data.filter(
        (item: { id: string | number }) =>
          !seenIdsRef.current.has(String(item.id)),
      );

      newItems.forEach((item: { id: string | number }) => {
        seenIdsRef.current.add(String(item.id));
      });

      if (newItems.length > 0) {
        console.log("Dispatching new items:", newItems.length);
        dispatch({ type: "ADD_ITEMS", payload: newItems });
      }

      const totalPages = data?.meta?.total_pages ?? 1;
      setHasMore(page < totalPages);
    }
    setIsFetching(false);
  }, [data, page]);

  const handleScrollEnd = useCallback(() => {
    console.log(
      "Scroll end detected. hasMore:",
      hasMore,
      "isFetching:",
      isFetching,
      "isLoading:",
      isLoading,
    );
    if (!hasMore || isFetching || isLoading) {
      console.log("Early return from scroll handler");
      return;
    }
    setIsFetching(true);
    console.log("Setting page to:", page + 1);
    setPage((p) => p + 1);
  }, [hasMore, isFetching, isLoading, page]);

  const options = useMemo(() => {
    const mappedOptions = itemsState.items.map((item) => ({
      label: item.name,
      value: String(item.id),
    }));
    console.log("Options created:", mappedOptions.length);
    return mappedOptions;
  }, [itemsState.items]);

  const finalOptions = [{ label: "الكل", value: "all" }, ...options];
  console.log("Final options passed to HeaderFilter:", finalOptions.length);

  return (
    <HeaderFilter
      placeholder="اختر الحالة"
      options={finalOptions}
      onFilterChange={onFilterChange}
      onScrollEnd={handleScrollEnd}
    />
  );
};

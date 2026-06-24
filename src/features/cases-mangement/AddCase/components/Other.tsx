import { InputForm } from "@/shared/components/inputs/InputForm";
import { SelectForm } from "@/shared/components/SelectForm";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { usePaginatedOptions } from "@/shared/hooks/usePaginatedOptions";
import { fetchClients } from "@/shared/api/services/getClients";
import { getClientStatuses } from "@/features/settings/client-statuses/api/services/getClientStatuses";
import { useCallback, useState } from "react";
type ClientOptionEntity = {
  id?: number | string;
  user_id?: number | string;
  name?: string;
  user?: { first_name?: string; last_name?: string };
};
type SelectOptionEntity = {
  id: number | string;
  name: string;
};

export function Other() {
  const [clientSearch, setClientSearch] = useState("");
  const [clientStatusSearch, setClientStatusSearch] = useState("");
  const debouncedClientSearch = useDebounce(clientSearch, 500);
  const debouncedClientStatusSearch = useDebounce(clientStatusSearch, 300);
  const fetchClientPage = useCallback(async (page: number, search?: string) => {
    const response = await fetchClients(page, 15, search);
    return {
      items: (response.data ?? []).map((client: ClientOptionEntity) => ({
        label:
          client.name ||
          [client.user?.first_name, client.user?.last_name]
            .filter(Boolean)
            .join(" ") ||
          "غير معروف",
        value: String(client.user_id ?? client.id ?? ""),
      })),
      totalPages: response.meta?.total_pages ?? 1,
    };
  }, []);
  const {
    options: clientOptions,
    hasMoreOptions: clientHasMoreOptions,
    isFetchingMore: clientIsFetchingMore,
    loadNextPage: loadMoreClients,
  } = usePaginatedOptions(fetchClientPage, debouncedClientSearch);

  const fetchClientStatusPage = useCallback(
    async (page: number, search?: string) => {
      const response = await getClientStatuses(page, 15, search);
      return {
        items: (response.data ?? []).map(
          (clientStatus: SelectOptionEntity) => ({
            label: clientStatus.name,
            value: String(clientStatus.id),
          }),
        ),
        totalPages: response.meta?.total_pages ?? 1,
      };
    },
    [],
  );

  const {
    options: clientStatusOptions,
    hasMoreOptions: clientStatusHasMoreOptions,
    isFetchingMore: clientStatusIsFetchingMore,
    loadNextPage: loadMoreClientStatuses,
  } = usePaginatedOptions(fetchClientStatusPage, debouncedClientStatusSearch);

  return (
    <>
      <InputForm
        label="نوع الشكوى / القضية"
        name="complaint_case_type"
        type="string"
        placeholder="نوع الشكوى / القضية"
      />
      <SelectForm
        label="اسم الموكل"
        name="client_id"
        options={clientOptions}
        placeholder="اختر الموكل"
        showSearch={true}
        onSearchChange={setClientSearch}
        hasMoreOptions={clientHasMoreOptions}
        isFetchingMore={clientIsFetchingMore}
        onReachEnd={loadMoreClients}
      />
      <InputForm
        label="عنوان او موضوع الشكوى / القضية"
        name="complaint_case_subject"
        type="string"
        placeholder="عنوان او موضوع الشكوى / القضية"
      />
      <InputForm
        label="حالة الشكوى / القضية"
        name="complaint_case_status"
        type="string"
        placeholder="حالة الشكوى / القضية"
      />
      <InputForm
        label="جهة الشكوى / القضية"
        name="complaint_case_authority"
        type="string"
        placeholder="جهة الشكوى / القضية"
      />
      <InputForm
        label="رقم الشكوى / القضية"
        name="Complaint_Number"
        type="number"
        placeholder="رقم الشكوى / القضية"
      />
      <InputForm
        label="تاريخ تسجيل الشكوى / القضية في الجهة"
        name="complaint_case_registration_date"
        type="date"
      />
      <SelectForm
        label="صفة الموكل"
        name="ClientStatus_id"
        options={clientStatusOptions}
        placeholder="اختر صفة الموكل"
        showSearch={true}
        onSearchChange={setClientStatusSearch}
        hasMoreOptions={clientStatusHasMoreOptions}
        isFetchingMore={clientStatusIsFetchingMore}
        onReachEnd={loadMoreClientStatuses}
      />
    </>
  );
}

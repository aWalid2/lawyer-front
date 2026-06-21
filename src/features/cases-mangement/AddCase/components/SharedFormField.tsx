import { useCallback, useState } from "react";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { InputForm } from "@/shared/components/inputs/InputForm";
import { SelectForm } from "@/shared/components/SelectForm";
import { fetchClients } from "@/shared/api/services/getClients";

import { getClientStatuses } from "@/features/settings/client-statuses/api/services/getClientStatuses";
import { getCaseTypes } from "@/features/settings/case-types/api/services/getCaseTypes";
import { fetchCaseStatuses } from "@/features/settings/case-statuses/api/service/getCaseStatuses";
import { usePaginatedOptions } from "@/shared/hooks/usePaginatedOptions";

type SelectOptionEntity = {
  id: number | string;
  name: string;
};

type ClientOptionEntity = {
  id?: number | string;
  user_id?: number | string;
  name?: string;
  user?: { first_name?: string; last_name?: string };
};

export function SharedFormField() {
  const [clientSearch, setClientSearch] = useState("");
  const debouncedClientSearch = useDebounce(clientSearch, 500);

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

  const [caseStatusSearch, setCaseStatusSearch] = useState("");
  const debouncedCaseStatusSearch = useDebounce(caseStatusSearch, 300);

  const fetchCaseStatusPage = useCallback(
    async (page: number, search?: string) => {
      const response = await fetchCaseStatuses(page, 15, search);
      return {
        items: (response.data ?? []).map((caseStatus: SelectOptionEntity) => ({
          label: caseStatus.name,
          value: String(caseStatus.id),
        })),
        totalPages: response.meta?.total_pages ?? 1,
      };
    },
    [],
  );

  const {
    options: caseStatusOptions,
    hasMoreOptions: caseStatusHasMoreOptions,
    isFetchingMore: caseStatusIsFetchingMore,
    loadNextPage: loadMoreCaseStatuses,
  } = usePaginatedOptions(fetchCaseStatusPage, debouncedCaseStatusSearch);

  const [caseTypeSearch, setCaseTypeSearch] = useState("");
  const debouncedCaseTypeSearch = useDebounce(caseTypeSearch, 300);

  const fetchCaseTypePage = useCallback(
    async (page: number, search?: string) => {
      const response = await getCaseTypes(page, 15, search);
      return {
        items: (response.data ?? []).map((caseType) => ({
          label: caseType.name,
          value: String(caseType.id),
        })),
        totalPages: response.meta?.total_pages ?? 1,
      };
    },
    [],
  );

  const {
    options: caseTypeOptions,
    hasMoreOptions: caseTypeHasMoreOptions,
    isFetchingMore: caseTypeIsFetchingMore,
    loadNextPage: loadMoreCaseTypes,
  } = usePaginatedOptions(fetchCaseTypePage, debouncedCaseTypeSearch);

  const [clientStatusSearch, setClientStatusSearch] = useState("");
  const debouncedClientStatusSearch = useDebounce(clientStatusSearch, 300);

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

  const options = clientOptions;

  return (
    <>
      <InputForm
        label="عنوان القضية"
        name="case_title"
        type="text"
        placeholder="عنوان القضية"
      />

      <SelectForm
        label="اسم الموكل"
        name="client_id"
        options={options}
        placeholder="اختر الموكل"
        showSearch={true}
        onSearchChange={setClientSearch}
        hasMoreOptions={clientHasMoreOptions}
        isFetchingMore={clientIsFetchingMore}
        onReachEnd={loadMoreClients}
      />

      <SelectForm
        showSearch={true}
        label="حالة القضية"
        name="case_status_id"
        options={caseStatusOptions}
        placeholder="اختر حالة القضية"
        onSearchChange={setCaseStatusSearch}
        hasMoreOptions={caseStatusHasMoreOptions}
        isFetchingMore={caseStatusIsFetchingMore}
        onReachEnd={loadMoreCaseStatuses}
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

      <SelectForm
        showSearch={true}
        label="نوع القضية"
        name="case_type_id"
        options={caseTypeOptions}
        placeholder="اختر نوع القضية"
        onSearchChange={setCaseTypeSearch}
        hasMoreOptions={caseTypeHasMoreOptions}
        isFetchingMore={caseTypeIsFetchingMore}
        onReachEnd={loadMoreCaseTypes}
      />
    </>
  );
}

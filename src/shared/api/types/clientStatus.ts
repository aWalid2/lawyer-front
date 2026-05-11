export interface ClientStatus {
  id: number | string;
  name: string;
}

export interface ClientStatusesResponse {
  data: ClientStatus[];
  meta: {
    total_pages: number;
  };
}

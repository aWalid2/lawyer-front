import type { ClientStatusT } from "../../types/clientStatusT";

// In-memory mock data for Client Statuses (صفات الموكل)
export let mockClientStatuses: ClientStatusT[] = [
  { id: "1", name: "مدعي", _count: { clients: 12 } },
  { id: "2", name: "مدعى عليه", _count: { clients: 25 } },
  { id: "3", name: "شاهد", _count: { clients: 8 } },
  { id: "4", name: "وكيل", _count: { clients: 15 } },
  { id: "5", name: "متهم", _count: { clients: 4 } },
];

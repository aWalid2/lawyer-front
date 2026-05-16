import type { PaymentItem } from "@/features/cases-mangement/Payments/types";

const PREFIX = "mock:case-payments:";

const DEFAULT = (caseId: string): PaymentItem[] => {
  const today = new Date().toISOString();
  return [
    {
      id: `${caseId}-pay-1`,
      paymentType: "client-payment",
      employeeId: 1,
      employeeName: "أحمد علي",
      description: "دفعة مقدم من العميل",
      amount: 3000,
      paymentDate: today,
      notes: "دفعة جزئية",
      attachments: [],
    },
  ];
};

const load = (caseId: string) => {
  try {
    const raw = localStorage.getItem(PREFIX + caseId);
    if (!raw) return null;
    return JSON.parse(raw) as PaymentItem[];
  } catch {
    return null;
  }
};

const save = (caseId: string, items: PaymentItem[]) =>
  localStorage.setItem(PREFIX + caseId, JSON.stringify(items));

export const ensure = (caseId: string) => {
  const existing = load(caseId);
  if (!existing) {
    const def = DEFAULT(caseId);
    save(caseId, def);
    return def;
  }
  return existing;
};

export const getCasePaymentsMock = async (caseId: string | number) => {
  const id = String(caseId);
  const data = ensure(id)!;
  return { data, meta: { total: data.length, totalPages: 1 } };
};

export const getCasePaymentMock = async (paymentId: string | number) => {
  const idStr = String(paymentId);
  const keys = Object.keys(localStorage).filter((k) => k.startsWith(PREFIX));
  for (const k of keys) {
    const items = JSON.parse(localStorage.getItem(k) || "[]") as PaymentItem[];
    const found = items.find((i) => i.id === idStr);
    if (found) return found;
  }
  throw new Error("Not found");
};

export const createCasePaymentMock = async ({ caseId, data }: { caseId: string | number; data: any }) => {
  const id = String(caseId);
  const items = ensure(id)!;
  const newItem: PaymentItem = {
    id: `${id}-pay-${Date.now()}`,
    paymentType: data.payment_type ?? data.get?.("payment_type") ?? "client-payment",
    employeeId: Number(data.employee_id ?? data.get?.("employee_id") ?? null) || null,
    employeeName: "موظف افتراضي",
    description: data.description ?? data.get?.("description") ?? "",
    amount: Number(data.amount ?? data.get?.("amount") ?? 0),
    paymentDate: data.payment_date ?? data.get?.("payment_date") ?? new Date().toISOString(),
    notes: data.notes ?? data.get?.("notes") ?? "",
    attachments: [],
  };
  items.unshift(newItem);
  save(id, items);
  return newItem;
};

export const updateCasePaymentMock = async ({ paymentId, data }: { paymentId: string | number; data: any }) => {
  const idStr = String(paymentId);
  const keys = Object.keys(localStorage).filter((k) => k.startsWith(PREFIX));
  for (const k of keys) {
    const items = JSON.parse(localStorage.getItem(k) || "[]") as PaymentItem[];
    const idx = items.findIndex((i) => i.id === idStr);
    if (idx >= 0) {
      const existing = items[idx];
      const updated = {
        ...existing,
        paymentType: data.payment_type ?? data.get?.("payment_type") ?? existing.paymentType,
        employeeId: Number(data.employee_id ?? data.get?.("employee_id") ?? existing.employeeId) || existing.employeeId,
        description: data.description ?? data.get?.("description") ?? existing.description,
        amount: Number(data.amount ?? data.get?.("amount") ?? existing.amount) || existing.amount,
        paymentDate: data.payment_date ?? data.get?.("payment_date") ?? existing.paymentDate,
        notes: data.notes ?? data.get?.("notes") ?? existing.notes,
      } as PaymentItem;
      items[idx] = updated;
      save(k.replace(PREFIX, ""), items);
      return updated;
    }
  }
  throw new Error("Not found");
};

export const deleteCasePaymentMock = async (paymentId: string | number) => {
  const idStr = String(paymentId);
  const keys = Object.keys(localStorage).filter((k) => k.startsWith(PREFIX));
  for (const k of keys) {
    const items = JSON.parse(localStorage.getItem(k) || "[]") as PaymentItem[];
    const idx = items.findIndex((i) => i.id === idStr);
    if (idx >= 0) {
      const [removed] = items.splice(idx, 1);
      save(k.replace(PREFIX, ""), items);
      return removed;
    }
  }
  throw new Error("Not found");
};

export const getCasePaymentsSummaryMock = async (caseId: string | number) => {
  const id = String(caseId);
  const items = ensure(id)!;
  const total = items.reduce((s, i) => s + (i.amount || 0), 0);
  const latest = items[0]?.paymentDate ?? null;
  return { total_amount: total, data: latest } as any;
};

export const getPaymentUsersMock = async () => [
  {
    id: 1,
    first_name: "أحمد",
    last_name: "محمد",
    email: "ahmed@example.com",
    phone: "01001234567",
    role: { role_name: "Lawyer" },
    userType: "employee",
    user_status: "active",
    fullName: "أحمد محمد",
  },
  {
    id: 2,
    first_name: "منى",
    last_name: "علي",
    email: "mona@example.com",
    phone: "01012345678",
    role: { role_name: "Secretary" },
    userType: "employee",
    user_status: "active",
    fullName: "منى علي",
  },
];

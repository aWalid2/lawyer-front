
type PaymentOption = {
  value: string;
  label: string;
};

export const PAYMENT_TYPE_OPTIONS: PaymentOption[] = [
  { value: "client refund", label: "استرداد من العميل" },
  { value: "payment refund", label: "دفعة من العميل" },
  { value: "other", label: "أخرى" },
];


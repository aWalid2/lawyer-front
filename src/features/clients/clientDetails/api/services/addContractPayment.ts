import api from "@/lib/api";

export const addContractPayment = async ({
  contractId,
  amount,
}: {
  contractId: number | string;
  amount: number;
}) => {
  const response = await api.post(`/contracts/${contractId}/payment`, {
    amount,
  });

  return response.data;
};

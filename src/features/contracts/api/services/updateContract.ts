import api from "@/lib/api";

export const updateContract = async ({
  contractId,
  data,
}: {
  contractId: string;
  data: FormData;
}) => {
  const response = await api.patch(`/contracts/${contractId}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
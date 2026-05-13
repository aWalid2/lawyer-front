import api from "@/lib/api";

export const createContract = async ({
  clientId,
  data,
}: {
  clientId: string;
  data: FormData;
}) => {
  const response = await api.post(`/contracts/${clientId}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
import api from "@/lib/api";

export const updateCaseDocument = async ({
  id,
  data,
}: {
  id: number;
  data: FormData;
}) => {
  const response = await api.patch(`/documnet/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
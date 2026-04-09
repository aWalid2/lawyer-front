// documents/api/service/updateDocument.ts
import api from "@/lib/api";

export const updateDocument = async (id: string, formData: FormData) => {
  const response = await api.patch(`/document/create-document/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
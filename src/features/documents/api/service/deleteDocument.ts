// documents/api/service/deleteDocument.ts
import api from "@/lib/api";

export const deleteDocument = async (id: string) => {
  const response = await api.delete(`/document/create-document/${id}`);
  return response.data;
};
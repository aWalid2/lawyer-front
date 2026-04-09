// documents/api/service/getDocument.ts
import api from "@/lib/api";

export const getDocument = async (id: string) => {
  const { data } = await api.get(`/document/create-document/${id}`);
  return data;
};
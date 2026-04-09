// documents/api/service/addDocument.ts
import api from "@/lib/api";

export const addDocument = async (formData: FormData) => {
  const response = await api.post("/document/create-document", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
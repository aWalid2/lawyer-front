import api from "@/lib/api";

export const createCaseDocument = async (data: FormData) => {
  const response = await api.post("/documnet/create-document", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
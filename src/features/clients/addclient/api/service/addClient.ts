// في ملف addClient.ts
import api from "@/lib/api";

export const addClients = async (formData: FormData) => {
  // للتصحيح - طباعة كل البيانات المرسلة
  console.log("=== Sending FormData ===");
  for (let pair of formData.entries()) {
    console.log(pair[0], pair[1]);
  }
  
  try {
    const { data } = await api.post("/users/client", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error: any) {
    console.error("API Error Response:", error.response?.data);
    console.error("API Error Status:", error.response?.status);
    throw error;
  }
};
// في ملف addClient.ts
import api from "@/lib/api";

export const taskUser = async (clientData: any) => {
  // للتصحيح - طباعة كل البيانات المرسلة
  console.log("=== Sending JSON Data ===");
  console.log(clientData);
  
  try {
    const { data } = await api.post("/task", clientData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error: any) {
    throw error;
  }
};
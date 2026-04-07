// في ملف addClient.ts
import api from "@/lib/api";

export const addPoliceStation = async (policeStationData: any) => {
  
  try {
    const { data } = await api.post("/police-station", policeStationData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error: any) {
    throw error;
  }
};
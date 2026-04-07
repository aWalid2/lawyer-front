// police-stations/api/service/updatePoliceStation.ts
import api from "@/lib/api";

export const updatePoliceStation = async (id: string, data: any) => {
  try {
    const response = await api.patch(`/police-station/${id}`, data);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};
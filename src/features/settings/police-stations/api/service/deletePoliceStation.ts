// police-stations/api/service/deletePoliceStation.ts
import api from "@/lib/api";

export const deletePoliceStation = async (id: string) => {
  try {
    const response = await api.delete(`/police-station/${id}`);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};
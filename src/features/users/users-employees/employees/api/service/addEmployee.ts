// service/addLawyers.ts
import api from "@/lib/api";

export const addEmployee = async (data: any) => {
  try {
    const { data: response } = await api.post("/users", {
      first_name: data.first_name,
      email: data.email,
      phone: data.phone,
      password: data.password,
      role: "employee",
      profile: {
        position: data.position,
        notes: data.notes,
      }
    });
    return response;
  } catch (error: any) {
    throw error;
  }
};
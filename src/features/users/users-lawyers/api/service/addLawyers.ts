// service/addLawyers.ts
import api from "@/lib/api";

export const addLawyers = async (data: any) => {
  try {
    const { data: response } = await api.post("/users", {
      first_name: data.first_name,
      email: data.email,
      phone: data.phone,
      nationality: data.nationality,
      password: data.password,
      country: data.country,
      address: data.address,
      ssn: data.ssn,
      role: "lawyer",
      profile: {
        specialization: data.specialization,
      }
    });
    return response;
  } catch (error: any) {
    throw error;
  }
};
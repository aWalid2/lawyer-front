import api from "@/lib/api";


export const updateLawyer = async ({ id, data }: { id: string; data: any }) => {
    const response = await api.patch(`/users/${id}`,
        {
            first_name: data.first_name,
            email: data.email,
            phone: data.phone,
            nationality: data.nationality,
            password: data.password,
            country: data.country,
            address: data.address,
            ssn: data.ssn,
            notes: data.notes,
            profile: {
                specialization: data.specialization,
            }
        }
    );
    return response.data;
};

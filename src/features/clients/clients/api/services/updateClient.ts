import api from "@/lib/api";


export const updateClient = async ({ id, data }: { id: string; data: any }) => {
    const response = await api.patch(`/users/client/${id}`, 
        {
            first_name: data.first_name,
            last_name: data.last_name,
            phone: data.phone,
            email: data.email,
            nationality: data.nationality,
            country: data.country,
            role_id: data.role_id,
            ssn: data.ssn,
            address: data.address,
        }

    );
    return response.data;
};

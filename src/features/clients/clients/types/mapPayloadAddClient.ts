export const mapToApiPayload = (data: any) => ({
    first_name: data.first_name,
    last_name: data.last_name,
    phone: data.phone,
    email: data.email,
    nationality: data.nationality,
    country: data.country,
    ssn: data.ssn,
    address: data.address,
    profile_photo: data.profile_photo,
    profile: {
        client_type: data.client_type,
    }
});
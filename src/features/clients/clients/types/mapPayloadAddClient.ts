export const mapToApiPayload = (data: any) => ({
    first_name: data.first_name,
    last_name: data.last_name,
    phone: data.phone,
    email: data.email,
    nationality: data.nationality,
    country: data.country,
    ssn: data.ssn,
    address: data.address,
    // Only send photo fields if they are strings (URLs). 
    // File objects/FileLists cannot be sent via JSON and cause Prisma errors.
    ...(typeof data.profile_photo === 'string' ? { profile_photo: data.profile_photo } : {}),
    profile: {
        client_type: data.client_type,
        notes: data.notes,
        ...(typeof data.contract_photo === 'string' ? { contract_photo: data.contract_photo } : {}),
    }
});
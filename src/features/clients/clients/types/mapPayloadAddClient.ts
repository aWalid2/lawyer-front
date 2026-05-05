type PayloadFileValue = File | FileList | string | null | undefined;

type ClientPayloadInput = {
    first_name?: string;
    phone?: string;
    email?: string;
    nationality?: string;
    country?: string;
    ssn?: string;
    address?: string;
    user_status?: string;
    authorization_photo?: PayloadFileValue;
    profile_photo?: PayloadFileValue;
    client_type?: string;
    notes?: string;
    contract_photo?: PayloadFileValue;
};

const isStringValue = (value: PayloadFileValue): value is string => typeof value === "string";

export const mapToApiPayload = (data: ClientPayloadInput) => ({
    first_name: data.first_name,
    phone: data.phone,
    email: data.email,
    nationality: data.nationality,
    country: data.country,
    ssn: data.ssn,
    address: data.address,
    user_status: data.user_status,
    ...(isStringValue(data.authorization_photo)
        ? { authorization_photo: data.authorization_photo }
        : {}),
    ...(isStringValue(data.profile_photo) ? { profile_photo: data.profile_photo } : {}),
    profile: {
        client_type: data.client_type,
        notes: data.notes,
        ...(isStringValue(data.contract_photo) ? { contract_photo: data.contract_photo } : {}),
    },
});

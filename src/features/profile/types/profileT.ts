export type UserProfileResponse = {
  id: number;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  email: string | null;
  nationality: string | null;
  country: string | null;
  ssn: string | null;
  address: string | null;
  photo: string | null;
};

export type UpdateProfilePayload = {
  first_name: string;
  email: string;
  phone: string;
  nationality: string;
  country: string;
  ssn: string;
  address: string;
  password?: string;
};

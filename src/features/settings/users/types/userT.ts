export interface UserT {
  id: number;
  name?: string;
  first_name: string;
  last_name?: string;
  email: string;
  phone?: string;
  civil_id?: string;
  hire_date?: string;
  created_at?: string;
  password?: string;
  role: {
    role_name: string;
  };
  userType: string;
  user_status: string;
  fullName: string;
}

export interface UserFormValues {
  first_name: string;
  email: string;
  phone: string;
  hire_date: string;
  civil_id: string;
  role_name: string;
  password: string;
  user_status: string;
}

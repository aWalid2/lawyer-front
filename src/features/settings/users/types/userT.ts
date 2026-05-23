export interface UserT {
  id: number;
  name?: string;
  first_name: string;
  last_name?: string;
  email: string;
  phone?: string;
  ssn?: string;
  hire_date?: string;
  created_at?: string;
  password?: string;
  role: {
    role_name: string;
  };
  role_id?: number;
  userType: string;
  user_status: string;
  fullName: string;
}

export interface UserFormValues {
  first_name: string;
  email: string;
  phone: string;
  hire_date: string;
  ssn?: string;
  role_name: string ;
  role_id?: number ;
  password: string;
  user_status: string;
}

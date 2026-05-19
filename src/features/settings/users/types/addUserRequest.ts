export interface AddUserRequest {
  username: string;
  email: string;
  phone: string;
  ssn: string;
  password: string;
  role: number;
  status: string;
  hire_date: string;
}

export interface UpdateUserRequest extends Partial<AddUserRequest> {
  first_name?: string;
  last_name?: string;
}

export interface RoleT {
  id: number;
  role_name: string;
  description?: string;
}

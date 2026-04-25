export interface UserT {
  id: number;
  name?: string;
  first_name: string;
  email: string;
  role: {
    role_name: string;
  };
  userType: string;
  user_status: string;
  fullName: string;
}

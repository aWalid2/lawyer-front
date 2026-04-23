export interface UserT {
  id: number;
  first_name: string;
  email: string;
  role: {
    role_name: string;
  };
  user_status: string;
}

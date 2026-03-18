export interface UserT {
  id: string;
  name: string;
  email: string;
  userType: "محامي" | "موظف" | "موكل";
  role: string;
  status: "نشط" | "غير نشط";
}

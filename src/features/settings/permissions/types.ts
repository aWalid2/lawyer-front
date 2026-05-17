export interface RoleT {
  id: string;
  name: string;
  userCount: number;
}

export interface RoleResponse {
  id: number;
  role_name: string;
  _count: {
    users: number;
  };
}

export interface UpdateRoleRequest {
  role_name: string;
}

export interface UpdateRoleResponse {
  id: number;
  role_name: string;
}

export interface CreateRoleRequest {
  role_name: string;
}

export interface CreateRoleResponse {
  id: number;
  role_name: string;
}

export interface AddPermissionsRequest {
  roleId: number;
  permissionIds: number[];
}

export interface AddPermissionsResponse {
  success: boolean;
  message?: string;
  id?: number;
  role_name?: string;
  permissions?: number[];
}

export interface Permission {
  id: number;
  name: string;
}

export interface RolePermission {
  id: number;
  role_name: string;
  permissions?: Permission[];
}

# Permissions API Integration

## Overview

This implementation integrates two API endpoints for managing roles and permissions in the permissions feature.

## API Endpoints

### 1. Create Role

- **Endpoint:** `POST /roles/createRole`
- **Request Body:**
  ```json
  {
    "role_name": "employee"
  }
  ```
- **Response:**
  ```json
  {
    "id": 5,
    "role_name": "employee"
  }
  ```

### 2. Add Permissions to Role

- **Endpoint:** `POST /roles/add-permissions`
- **Request Body:**
  ```json
  {
    "roleId": 1,
    "permissionIds": [17, 20]
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Permissions added successfully",
    "id": 1,
    "role_name": "employee",
    "permissions": [17, 20]
  }
  ```

## File Structure

```
src/features/settings/permissions/
├── api/
│   ├── services/
│   │   ├── createRole.ts          # Service for creating roles
│   │   └── addPermissions.ts      # Service for adding permissions
│   ├── hooks/
│   │   ├── useCreateRole.ts       # React Query hook for role creation
│   │   └── useAddPermissions.ts   # React Query hook for adding permissions
│   └── index.ts                   # Barrel export
├── components/
│   ├── AddRoleFeature.tsx         # Updated to use APIs
│   ├── PermissionsHeader.tsx
│   ├── PermissionsAction.tsx
│   └── FormSection.tsx
├── hooks/
│   └── useRoleModulesData.ts
├── types.ts                        # Updated with new types
└── index.tsx
```

## Types

### `CreateRoleRequest`

```typescript
interface CreateRoleRequest {
  role_name: string;
}
```

### `CreateRoleResponse`

```typescript
interface CreateRoleResponse {
  id: number;
  role_name: string;
}
```

### `AddPermissionsRequest`

```typescript
interface AddPermissionsRequest {
  roleId: number;
  permissionIds: number[];
}
```

### `AddPermissionsResponse`

```typescript
interface AddPermissionsResponse {
  success: boolean;
  message?: string;
  id?: number;
  role_name?: string;
  permissions?: number[];
}
```

## Usage

### In Components

```typescript
import { useCreateRole } from "@/features/settings/permissions/api/hooks/useCreateRole";
import { useAddPermissions } from "@/features/settings/permissions/api/hooks/useAddPermissions";

export const AddRoleFeature = () => {
  const createRoleMutation = useCreateRole();
  const addPermissionsMutation = useAddPermissions();

  const handleSubmit = async (values: { name: string }) => {
    try {
      // Step 1: Create the role
      const roleResponse = await createRoleMutation.mutateAsync({
        role_name: values.name,
      });

      // Step 2: Add permissions to the role
      await addPermissionsMutation.mutateAsync({
        roleId: roleResponse.id,
        permissionIds: [1, 2, 3],
      });

      toast.success("Role created successfully");
    } catch (error) {
      toast.error("Failed to create role");
    }
  };

  return (
    <button
      onClick={() => handleSubmit({ name: "employee" })}
      disabled={createRoleMutation.isPending || addPermissionsMutation.isPending}
    >
      Create Role
    </button>
  );
};
```

## Features

✅ **Type-Safe:** Full TypeScript support with strict types
✅ **React Query Integration:** Automatic query invalidation after mutations
✅ **Error Handling:** Built-in error handling with toast notifications
✅ **Loading States:** Accessible loading states for UI feedback
✅ **Cache Management:** Automatic query cache invalidation on success

## Error Handling

Both hooks include error handling that:

1. Logs errors to console
2. Invalidates queries for cache consistency
3. Allows components to catch and display custom error messages

## Query Keys

The hooks invalidate the following query keys on success:

- `["roles"]` - General roles list
- `["role-permissions"]` - Role-specific permissions

## Integration Steps

1. ✅ Types defined in `src/features/settings/permissions/types.ts`
2. ✅ API services created in `api/services/`
3. ✅ React Query hooks created in `api/hooks/`
4. ✅ AddRoleFeature component updated to use the APIs
5. ✅ Error handling and loading states implemented
6. ✅ Toast notifications configured with Sonner

## Next Steps

To complete the integration:

1. Test the endpoints in your backend
2. Verify permission ID mappings match your backend
3. Update the permissions list display to fetch from API if needed
4. Add edit/update role functionality if required

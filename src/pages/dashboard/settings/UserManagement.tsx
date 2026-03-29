import PageLayout from "@/shared/components/PageLayout";
import { UserManagementFeature } from "@/features/settings/users";

const UserManagement = () => {
  return (
    <PageLayout>
      <UserManagementFeature />
    </PageLayout>
  );
};

export default UserManagement;

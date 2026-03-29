import PageLayout from "@/shared/components/PageLayout";
import { UsersClient } from "@/features/users/users-clients";
import { useFetchClients } from "./hooks/useGetClients";



const Clients = () => {
  const { data, isLoading, error } = useFetchClients();
  console.log(data);
  console.log(isLoading);
  console.log(error);

  return (
    <PageLayout>
      <UsersClient />
    </PageLayout>
  );
};

export default Clients;
import LoadingPage from "@/shared/components/LoadingPage";
import { useGetClient } from "@/features/clients/clientDetails/api/hooks/useGetClient";
import { useParams } from "react-router-dom";
import { Error } from "@/shared/components/Error";
import { BasicClientDetails } from "./components/BasicClientDetails";
import { ContractDetails } from "./components/ContractDetails";

const ClientDetailsInfo: React.FC = () => {
  const { id } = useParams();
  const { data: client, isPending, isError } = useGetClient(id!);

  if (isPending) return <LoadingPage />;
  if (isError) return <Error />;

  return (
    <div className="space-y-6">
      <BasicClientDetails client={client} />
      <ContractDetails
        clientId={client?.user_id}
        contracts={
          client?.contracts ?? (client?.contract ? [client.contract] : null)
        }
      />
    </div>
  );
};

export default ClientDetailsInfo;

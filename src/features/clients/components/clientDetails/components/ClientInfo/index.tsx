import React from "react";
import FormDetails from "./components/FormInfoDetails";
import type { ClientInfoProps } from "./components/FormInfoDetails/components/typesClientsInfo";

export const ClientInfo: React.FC<ClientInfoProps> = ({
  isEditing,
  clientData,
}) => {
  return (
    <>
      <FormDetails isEditing={isEditing} clientData={clientData} />
    </>
  );
};

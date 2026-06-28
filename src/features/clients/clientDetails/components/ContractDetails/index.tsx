import { useState } from "react";
import { AddContractDialog } from "../AddContractDialog";
import { ContractCard } from "./components/ContractCard";
import type { ClientContract } from "../../types/client";

interface ContractDetailsProps {
  contracts?: ClientContract[] | null;
  clientId?: string | number;
}

export const ContractDetails: React.FC<ContractDetailsProps> = ({
  contracts,
  clientId,
}) => {
  const [openIndex, setOpenIndex] = useState<number>(0);
  if (!contracts || contracts.length === 0) {
    return (
      <>
        <div className="rounded-xl border border-dashed border-gray-200 bg-[#FBFBFB] p-10 text-center text-sm text-gray-500">
          لا توجد عقود لهذا الموكل
        </div>
        {clientId && (
          <div className="mt-4 flex justify-center">
            <AddContractDialog clientId={String(clientId)} />
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <div className="space-y-3">
        {contracts.map((contract, index) => (
          <ContractCard
            key={contract.id ?? index}
            contract={contract}
            index={index}
            total={contracts.length}
            isOpen={openIndex === index}
            onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
          />
        ))}

        {clientId && (
          <div className="flex justify-center">
            <AddContractDialog clientId={String(clientId)} />
          </div>
        )}
      </div>
    </>
  );
};

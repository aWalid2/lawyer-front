import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { CheveronDownIcon } from "@/shared/icons/CheveronDown";
import { CustomLayoutBorder } from "@/shared/components/CustomLayoutBorder";
import { ContractInfoFields } from "./ContractInfoFields";
import type { ClientContract } from "../../../types/client";

interface ContractCardProps {
  contract: ClientContract;
  index: number;
  total: number;
  isOpen: boolean;
  onToggle: () => void;
}

export const ContractCard = ({
  contract,
  index,
  total,
  isOpen,
  onToggle,
}: ContractCardProps) => {
  return (
    <Collapsible open={isOpen} onOpenChange={onToggle}>
      <CustomLayoutBorder>
        <CollapsibleTrigger className="w-full cursor-pointer">
          <div
            className={`flex items-center justify-between gap-2 max-md:flex-col max-md:items-start ${isOpen ? "mb-3" : "mb-0"}`}
          >
            <h3 className="text-lg font-semibold text-[#153A4D]">
              {total > 1 ? `بيانات العقد (${index + 1})` : "بيانات العقد"}
            </h3>
            <CheveronDownIcon
              className={`h-4 w-4 text-[#153A4D] transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <ContractInfoFields contract={contract} />
        </CollapsibleContent>
      </CustomLayoutBorder>
    </Collapsible>
  );
};

import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar, FileText, Hash, Link2 } from "lucide-react";
import LoadingPage from "@/shared/components/LoadingPage";

export interface ContractItem {
  id: number;
  client_id: number;
  start_date: string;
  end_date: string | null;
  contract_value: string;
  contract_duration: number;
  document_file: string;
  created_at: string;
}

interface ContractCardsProps {
  value?: number | null;
  onChange: (contractId: number) => void;
  contracts?: ContractItem[];
  isPending?: boolean;
}

export function ContractCards({
  value,
  onChange,
  contracts,
  isPending,
}: ContractCardsProps) {
  if (isPending) {
    return <LoadingPage />;
  }

  if (!contracts || contracts.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-200 bg-[#FBFBFB] p-6 text-center text-sm text-gray-500">
        لا توجد عقود متاحة لهذا الموكل
      </div>
    );
  }

  return (
    <RadioGroup
      value={value?.toString() ?? ""}
      onValueChange={(val) => onChange(Number(val))}
      dir="rtl"
      className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
    >
      {contracts.map((contract) => {
        const isSelected = value === contract.id;
        const startYear =
          contract.start_date?.split("T")[0] || contract.start_date || "";
        return (
          <Label key={contract.id} htmlFor={`contract-${contract.id}`}>
            <Card
              className={`border-border/60 w-full cursor-pointer transition-all hover:shadow-sm ${
                isSelected
                  ? "border-primary ring-primary/30 ring-2"
                  : "hover:border-primary/40"
              }`}
            >
              <CardContent className="flex items-start gap-3">
                <RadioGroupItem
                  value={contract.id.toString()}
                  id={`contract-${contract.id}`}
                  className="mt-0.5 shrink-0"
                />
                <div className="text-muted-foreground space-y-1.5 text-xs">
                  <div className="flex items-center gap-2">
                    <FileText className="text-primary/70 h-3.5 w-3.5" />
                    <span>عقد #{contract.id}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="text-primary/70 h-3.5 w-3.5" />
                    <span>{startYear}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Hash className="text-primary/70 h-3.5 w-3.5" />
                    <span>القيمة: {contract.contract_value}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link2 className="text-primary/70 h-3.5 w-3.5" />
                    <span>المدة: {contract.contract_duration} شهر</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Label>
        );
      })}
    </RadioGroup>
  );
}

import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar, FileText, Hash, Link2 } from "lucide-react";

interface Contract {
  id: number;
  contract_number: string;
  start_date: string;
  duration: string;
  linked_cases_count: number;
}

const mockContracts: Contract[] = [
  {
    id: 1,
    contract_number: "CTR-2025-001",
    start_date: "2025-01-15",
    duration: "12 شهر",
    linked_cases_count: 3,
  },
  {
    id: 2,
    contract_number: "CTR-2025-002",
    start_date: "2025-03-01",
    duration: "24 شهر",
    linked_cases_count: 5,
  },
  {
    id: 3,
    contract_number: "CTR-2024-015",
    start_date: "2024-06-20",
    duration: "18 شهر",
    linked_cases_count: 2,
  },
];

interface ContractCardsProps {
  value?: number | null;
  onChange: (contractId: number) => void;
}

export function ContractCards({ value, onChange }: ContractCardsProps) {
  return (
    <RadioGroup
      value={value?.toString() ?? ""}
      onValueChange={(val) => onChange(Number(val))}
      dir="rtl"
      className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
    >
      {mockContracts.map((contract) => {
        const isSelected = value === contract.id;
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
                    <span>{contract.contract_number}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="text-primary/70 h-3.5 w-3.5" />
                    <span>{contract.start_date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Hash className="text-primary/70 h-3.5 w-3.5" />
                    <span>المدة: {contract.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link2 className="text-primary/70 h-3.5 w-3.5" />
                    <span>{contract.linked_cases_count} قضية مرتبطة</span>
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

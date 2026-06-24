import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { InputForm } from "@/shared/components/inputs/InputForm";
import { useFormikContext } from "formik";
import { ContractCards, type ContractItem } from "./ContractCards";
import { useGetClient } from "@/features/clients/clientDetails/api/hooks/useGetClient";
import { useMemo } from "react";

export function FeesRadio() {
  const { values, setFieldValue } = useFormikContext<any>();
  const clientId = values.client_id;
  const { data: clientData, isPending: isClientPending } =
    useGetClient(clientId);

  const contracts: ContractItem[] = useMemo(() => {
    if (!clientData?.contracts || !Array.isArray(clientData.contracts))
      return [];
    return clientData.contracts.map((c: any) => ({
      id: c.id,
      client_id: c.client_id,
      start_date: c.start_date,
      end_date: c.end_date,
      contract_value: c.contract_value,
      contract_duration: c.contract_duration,
      document_file: c.document_file,
      created_at: c.created_at,
    }));
  }, [clientData]);

  return (
    <>
      <RadioGroup
        name="case_fees_type"
        dir="rtl"
        value={values.case_fees_type}
        onValueChange={(val) => setFieldValue("case_fees_type", val)}
        className="flex w-full flex-col items-start justify-start sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex items-center gap-3">
          <RadioGroupItem value="fixed_profits" id="r1" />
          <Label htmlFor="r1">أتعاب ثابتة</Label>
        </div>

        <div className="flex items-center gap-3">
          <RadioGroupItem value="percentage_of_profits" id="r2" />
          <Label htmlFor="r2">نسبة من الأرباح</Label>
        </div>

        <div className="flex items-center gap-3">
          <RadioGroupItem value="contract_based" id="r3" />
          <Label htmlFor="r3">تابعة للعقد</Label>
        </div>
      </RadioGroup>

      <div className="mt-4">
        {values.case_fees_type === "fixed_profits" && (
          <InputForm
            label="قيمة الأتعاب الثابتة"
            name="fixed_profits"
            type="number"
            placeholder="0.00"
          />
        )}

        {values.case_fees_type === "percentage_of_profits" && (
          <div className="flex w-full gap-3">
            <div className="flex w-full items-end gap-3">
              <InputForm
                label="نسبة الأرباح المستحقة"
                name="percentage_of_profits"
                type="number"
                placeholder="15"
              />
              <div className="text-secondary mb-2 text-4xl">%</div>
            </div>
          </div>
        )}

        {values.case_fees_type === "contract_based" && (
          <ContractCards
            value={values.selected_contract}
            onChange={(contractId) =>
              setFieldValue("selected_contract", contractId)
            }
            contracts={contracts}
            isPending={isClientPending}
          />
        )}
      </div>
    </>
  );
}

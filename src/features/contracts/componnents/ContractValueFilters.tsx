import React, { useEffect, useState } from "react";
import { useDebounce } from "@/shared/hooks/useDebounce";

interface ContractValueFiltersProps {
  contractValueMin: string;
  contractValueMax: string;
  onFilterChange: (
    key: "contractValueMin" | "contractValueMax",
    value: string,
  ) => void;
}

export const ContractValueFilters: React.FC<ContractValueFiltersProps> = ({
  contractValueMin,
  contractValueMax,
  onFilterChange,
}) => {
  const [minValue, setMinValue] = useState(contractValueMin);
  const [maxValue, setMaxValue] = useState(contractValueMax);
  const debouncedMinValue = useDebounce(minValue, 400);
  const debouncedMaxValue = useDebounce(maxValue, 400);

  useEffect(() => {
    setMinValue(contractValueMin);
  }, [contractValueMin]);

  useEffect(() => {
    setMaxValue(contractValueMax);
  }, [contractValueMax]);

  useEffect(() => {
    if (debouncedMinValue !== contractValueMin) {
      onFilterChange("contractValueMin", debouncedMinValue);
    }
  }, [contractValueMin, debouncedMinValue, onFilterChange]);

  useEffect(() => {
    if (debouncedMaxValue !== contractValueMax) {
      onFilterChange("contractValueMax", debouncedMaxValue);
    }
  }, [contractValueMax, debouncedMaxValue, onFilterChange]);

  return (
    <>
      <input
        type="number"
        value={minValue}
        onChange={(event) => setMinValue(event.target.value)}
        placeholder="أقل قيمة"
        className="h-12.5 w-full rounded-[18px] border border-[#E2E8F0] bg-white px-4 text-right text-sm transition-all outline-none focus:border-[#BF9A61] focus:ring-2 focus:ring-[#BF9A61]/10 md:w-32.5"
      />

      <input
        type="number"
        value={maxValue}
        onChange={(event) => setMaxValue(event.target.value)}
        placeholder="أعلى قيمة"
        className="h-12.5 w-full rounded-[18px] border border-[#E2E8F0] bg-white px-4 text-right text-sm transition-all outline-none focus:border-[#BF9A61] focus:ring-2 focus:ring-[#BF9A61]/10 md:w-32.5"
      />
    </>
  );
};

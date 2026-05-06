import React from "react";
import { InputBox } from "@/shared/components/InputBox";
import type { DetailField } from "./typesCaseInfo";

interface CaseDetailsSectionProps {
  title: string;
  fields: DetailField[];
}

export const CaseDetailsSection: React.FC<CaseDetailsSectionProps> = ({
  title,
  fields,
}) => {
  return (
    <section className="space-y-4 rounded-2xl border border-[#E8E8E8] bg-white p-5 dark:border-white/10 dark:bg-transparent">
      <h3 className="text-lg font-semibold text-[#153A4D] dark:text-white">
        {title}
      </h3>
      <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
        {fields.map((field) => (
          <InputBox
            key={field.label}
            label={field.label}
            text={field.text || "-"}
            className={field.className}
          />
        ))}
      </div>
    </section>
  );
};

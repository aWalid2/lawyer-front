import React from "react";
import { ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { InputBox } from "@/shared/components/inputs/InputBox";
import type { DetailField } from "./typesCaseInfo";

interface CaseDetailsCollapsibleSectionProps {
  title: string;
  fields: DetailField[];
  defaultOpen?: boolean;
}

export const CaseDetailsCollapsibleSection: React.FC<
  CaseDetailsCollapsibleSectionProps
> = ({ title, fields, defaultOpen = false }) => {
  const [open, setOpen] = React.useState(defaultOpen);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <section className="rounded-2xl border border-[#E8E8E8] bg-white dark:border-white/10 dark:bg-transparent">
        <CollapsibleTrigger asChild>
          <button
            type="button"
            className="flex w-full items-center justify-between px-5 py-4 text-right"
          >
            <h3 className="text-lg font-semibold text-[#153A4D] dark:text-white">
              {title}
            </h3>
            <ChevronDown
              className={`h-5 w-5 text-[#153A4D] transition-transform dark:text-white ${open ? "rotate-180" : ""}`}
            />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent className="px-5 pb-5">
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
        </CollapsibleContent>
      </section>
    </Collapsible>
  );
};

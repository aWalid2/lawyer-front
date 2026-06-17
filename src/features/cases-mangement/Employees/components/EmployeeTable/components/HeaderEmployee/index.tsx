import React from "react";
import { ButtonUpdateInfo } from "@/shared/components/buttons/ButtonUpdateInfo";
import { HeaderTitle } from "@/shared/components/Header/HeaderTitle";
import { CaseEmployeeDialog } from "../CaseEmployeeDialog";
import type { CaseEmployeeFormValues } from "../../types";

interface HeaderEmployeeProps {
  title: string;
  buttonText: string;
  employeeOptions: Array<{ label: React.ReactNode; value: string | number }>;
  onSave: (values: CaseEmployeeFormValues, id?: number) => Promise<void> | void;
  isPending?: boolean;
  isOptionsPending?: boolean;
}

export const HeaderEmployee: React.FC<HeaderEmployeeProps> = ({
  title,
  buttonText,
  employeeOptions,
  onSave,
  isPending = false,
  isOptionsPending = false,
}) => {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
      <HeaderTitle title={title} />
      <CaseEmployeeDialog
        onSave={onSave}
        employeeOptions={employeeOptions}
        isOptionsPending={isOptionsPending}
        isPending={isPending}
        trigger={<ButtonUpdateInfo type="add" text={buttonText} />}
      />
    </div>
  );
};

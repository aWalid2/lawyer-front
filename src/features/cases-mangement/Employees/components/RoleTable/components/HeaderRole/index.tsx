import React from "react";
import { ButtonUpdateInfo } from "@/shared/components/ButtonUpdateInfo";
import { HeaderTitle } from "@/shared/components/HeaderTitle";
import { CaseRoleDialog } from "../CaseRoleDialog";
import type { CaseRoleFormValues } from "../../types";

interface HeaderRoleProps {
  title: string;
  buttonText: string;
  roleOptions: Array<{ label: React.ReactNode; value: string | number }>;
  onSave: (values: CaseRoleFormValues, id?: number) => Promise<void> | void;
  isPending?: boolean;
  isOptionsPending?: boolean;
}

export const HeaderRole: React.FC<HeaderRoleProps> = ({
  title,
  buttonText,
  roleOptions,
  onSave,
  isPending = false,
  isOptionsPending = false,
}) => {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
      <HeaderTitle title={title} />
      <CaseRoleDialog
        onSave={onSave}
        roleOptions={roleOptions}
        isOptionsPending={isOptionsPending}
        isPending={isPending}
        trigger={<ButtonUpdateInfo type="add" text={buttonText} />}
      />
    </div>
  );
};

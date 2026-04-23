import { HeaderTitle } from "@/shared/components/HeaderTitle";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { RelationalCaseDialog } from "./RelationalCaseDialog";

export const HeaderRelationalCases = ({
  title,
  caseId,
}: {
  title: string;
  caseId: string;
}) => {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
      <HeaderTitle title={title} />
      <RelationalCaseDialog
        caseId={caseId}
        title="إضافة قضية مرتبطة"
        trigger={
          <Button className="bg-primary-gradient flex h-12.5 items-center gap-2 rounded-[12px] px-6 font-semibold text-white">
            <Plus />
            إضافة قضية مرتبطة
          </Button>
        }
      />
    </div>
  );
};

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { SessionDialog } from "./SessionDialog";
import { useState } from "react";
import { HeaderTitle } from "@/shared/components/HeaderTitle";

export const HeaderSessionsTable = ({
  title,
  onAdd,
}: {
  title: string;
  onAdd: (values: any) => void;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex w-full flex-wrap items-center justify-between gap-2 pb-6">
      <HeaderTitle innerPage title={title} />
      <SessionDialog
        open={open}
        onOpenChange={setOpen}
        onSave={onAdd}
        trigger={
          <Button className="rounded-main flex h-12.5 items-center gap-2 bg-[#BF9A61] px-8 text-sm font-semibold whitespace-nowrap text-white shadow-[0_4px_14px_0_rgba(191,154,97,0.39)] transition-all hover:bg-[#A68654] active:scale-95">
            <PlusIcon className="h-4 w-4" /> إضافة جلسة
          </Button>
        }
      />
    </div>
  );
};

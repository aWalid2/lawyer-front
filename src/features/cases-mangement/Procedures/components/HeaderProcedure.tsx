import { HeaderTitle } from "@/components/shared/components/HeaderTitle";
import { Button } from "@/components/ui/button";
import { ProcedureDialog } from "./ProcedureDialog";

export const HeaderProcedure = ({ title, buttonText }: { title: string; buttonText: string }) => {
    return (
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <HeaderTitle title={title} />
            <ProcedureDialog
                trigger={
                    <Button className="rounded-[12px] h-12.5 px-6 bg-primary-gradient font-semibold text-white">
                        {buttonText}
                    </Button>
                }
            />
        </div>
    );
};

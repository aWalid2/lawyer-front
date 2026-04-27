import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { XIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface LayoutDialogProps {
  title: string;
  trigger?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  showCloseButton?: boolean;
}

export const LayoutDialog: React.FC<LayoutDialogProps> = ({
  title,
  trigger,
  children,
  className,
  open,
  onOpenChange,
  showCloseButton = true,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent
        className={cn(
          "rounded-main flex max-h-[90vh] flex-col overflow-hidden border-none px-2 py-3 text-right sm:max-w-175 sm:rounded-[24px] sm:px-6 sm:py-5",
          className,
        )}
        dir="rtl"
        showCloseButton={false}
      >
        {showCloseButton && (
          <DialogClose asChild>
            <button className="rounded-main absolute inset-e-6 top-8 flex h-12.5 items-center gap-2 px-6 py-2.5 font-semibold text-gray-400 transition-all hover:text-gray-600 sm:inset-e-15">
              <XIcon size={23} />
            </button>
          </DialogClose>
        )}

        <DialogHeader className="mt-10 mb-2">
          <DialogTitle className="text-center text-2xl font-bold text-[#153A4D]">
            {title}
          </DialogTitle>
        </DialogHeader>

        <div className="custom-scrollbar flex-1 overflow-y-auto pb-2 pl-2">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
};

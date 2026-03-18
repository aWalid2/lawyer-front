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
          "sm:max-w-[700px] max-h-[90vh] flex flex-col overflow-hidden sm:px-20 px-6 sm:py-10 py-6 sm:rounded-[24px] rounded-main border-none text-right",
          className
        )}
        dir="rtl"
        showCloseButton={false}
      >
        {showCloseButton && (
          <DialogClose asChild>
            <button className="absolute top-8 sm:inset-e-15 inset-e-6 text-gray-400 hover:text-gray-600 px-6 py-2.5 rounded-main font-semibold flex items-center gap-2 h-12.5 transition-all">
              <XIcon size={23} />
            </button>
          </DialogClose>
        )}

        <DialogHeader className="mb-2 mt-10">
          <DialogTitle className="text-2xl font-bold text-center text-[#153A4D]">
            {title}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto custom-scrollbar pl-2 pb-2">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
};

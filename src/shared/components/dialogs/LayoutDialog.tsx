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
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  showCloseButton?: boolean;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "details";
  padding?: "default" | "sm" | "wide";
  align?: "right" | "start";
}

export const LayoutDialog: React.FC<LayoutDialogProps> = ({
  title,
  trigger,
  children,
  open,
  onOpenChange,
  showCloseButton = true,
  size = "md",
  padding = "default",
  align = "right",
}) => {
  const sizeClasses = {
    sm: "sm:max-w-125",
    md: "sm:max-w-162.5",
    lg: "sm:max-w-178.75",
    xl: "sm:max-w-193",
    "2xl": "sm:max-w-237.5",
    details: "sm:max-w-225",
  };

  const paddingClasses = {
    default: "px-6 py-6 sm:px-12 sm:py-10",
    sm: "px-6 py-6 sm:px-8 sm:py-6",
    wide: "px-6 py-6 sm:px-20 sm:py-10",
  };

  const alignClasses = {
    right: "text-right",
    start: "text-start",
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent
        className={cn(
          "rounded-main flex max-h-[90vh] flex-col overflow-hidden border-none sm:rounded-[24px]",
          sizeClasses[size],
          paddingClasses[padding],
          alignClasses[align],
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

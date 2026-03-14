import React from "react";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";

interface HeaderActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "gradient";
  label: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  asChild?: boolean;
}

export const HeaderActionButton: React.FC<HeaderActionButtonProps> = ({
  variant = "primary",
  label,
  icon,
  iconPosition = "left",
  className,
  asChild = false,
  ...props
}) => {
  const Comp = asChild ? Slot : "button";

  const baseStyles =
    "h-12 px-6 rounded-xl flex items-center gap-2 text-sm font-semibold transition-all active:scale-95 whitespace-nowrap";

  const variants = {
    primary:
      "bg-[#BF9A61] hover:bg-[#A68654] text-white shadow-[0_4px_14px_0_rgba(191,154,97,0.39)]",
    outline:
      "border border-[#E2E8F0] bg-white text-[#4A5568] hover:border-[#BF9A61] min-w-[140px] justify-between",
    gradient:
      "bg-primary-gradient text-white shadow-[0_4px_14px_0_rgba(191,154,97,0.39)]",
  };

  return (
    <Comp className={cn(baseStyles, variants[variant], className)} {...props}>
      {icon && iconPosition === "right" && icon}
      <span>{label}</span>
      {icon && iconPosition === "left" && icon}
    </Comp>
  );
};

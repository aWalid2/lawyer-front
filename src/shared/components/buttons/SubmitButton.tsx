import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import React, { type ReactNode } from "react";

export interface SubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isPending: boolean;
  loadingText?: string;
  children: ReactNode;
}

export const SubmitButton = ({
  isPending,
  loadingText = "جاري الإضافة...",
  children,
  className,
  ...props
}: SubmitButtonProps) => {
  return (
    <Button
      type="submit"
      className={`w-full flex items-center gap-2 px-6 py-3 text-white font-cairo rounded-main transition-all whitespace-nowrap h-[50px] justify-center relative overflow-hidden ${className || ""}`}
      disabled={isPending || props.disabled}
      {...props}
    >
      {isPending ? (
        <>
          <Spinner />
          <span className="text-white">{loadingText}</span>
        </>
      ) : (
        children
      )}
    </Button>
  );
};

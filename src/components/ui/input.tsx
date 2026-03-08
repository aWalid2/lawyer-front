import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    "flex w-full border border-[#E8E8E8] rounded-[10px] p-3 bg-[#FBFBFB] h-[50px] text-[#464646] text-base font-normal file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#A1A1A1] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E8E8E8] disabled:cursor-not-allowed disabled:opacity-70",
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);
Input.displayName = "Input";

export { Input };

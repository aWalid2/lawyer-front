import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"
import { cn } from "@/lib/utils"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    dir="rtl"
    className={cn(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors",
      "bg-gray-300 data-[state=checked]:bg-amber-500",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "block h-4 w-4 rounded-full bg-white shadow-md transition-transform",
        "translate-x-0 data-[state=checked]:-translate-x-5"
      )}
    />
  </SwitchPrimitives.Root>
))

Switch.displayName = "Switch"

export { Switch }
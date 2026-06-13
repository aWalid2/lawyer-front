import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const ButtonShowAll = ({ text }: { text: string }) => {
  return (
    <Button
      className={cn(
        "rounded-main flex h-11.5 items-center gap-2 px-4 text-sm font-semibold whitespace-nowrap transition-all active:scale-95",
        "bg-primary-gradient hover:bg-primary-gradient text-white",
      )}
    >
      <span>{text}</span>
    </Button>
  );
};

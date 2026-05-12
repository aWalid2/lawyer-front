import type { LucideIcon } from "lucide-react";

interface ChatHeaderIconButtonProps {
  icon: LucideIcon;
}

export const ChatHeaderIconButton = ({
  icon: Icon,
}: ChatHeaderIconButtonProps) => {
  return (
    <button
      type="button"
      className="rounded-full bg-[#F7F4EE] p-2 text-[#607080]"
    >
      <Icon className="h-4 w-4" />
    </button>
  );
};

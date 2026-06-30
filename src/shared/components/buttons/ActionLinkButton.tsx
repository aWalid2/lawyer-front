import React from "react";
import type { LucideIcon } from "lucide-react";

interface ActionLinkButtonProps {
  href: string;
  icon: LucideIcon;
  title: string;
  openInNewTab?: boolean;
  disabled?: boolean;
}

export const ActionLinkButton: React.FC<ActionLinkButtonProps> = ({
  href,
  icon: Icon,
  title,
  openInNewTab = false,
  disabled = false,
}) => {
  if (disabled) {
    return (
      <span
        title={title}
        className="flex h-9 w-9 cursor-not-allowed items-center justify-center rounded-lg bg-[#F1F1F3] opacity-60"
      >
        <Icon className="text-primary size-3.5" />
      </span>
    );
  }

  const linkProps = openInNewTab
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <a
      href={href}
      title={title}
      className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F1F1F3]"
      {...linkProps}
    >
      <Icon className="text-primary size-3.5" />
    </a>
  );
};

import React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center justify-between p-4 rounded-lg transition
  ${
    isActive
      ? "bg-gradient-to-l from-[#CBA462] to-[#E3C086] text-white"
      : "text-[#727272] hover:bg-primary hover:text-white"
  }`;

type Item = {
  to: string;
  label: string;
};

type CollapsibleNavDashboardProps = {
  data: Item[];
  title: string;
  icon: React.ReactNode;
  onLinkClick?: () => void;
};

const CollapsibleNavDashboard: React.FC<CollapsibleNavDashboardProps> = ({
  data,
  title,
  icon,
  onLinkClick,
}) => {
  const location = useLocation();
  const hasActiveChild = useMemo(
    () => data.some((item) => location.pathname.startsWith(item.to)),
    [data, location.pathname],
  );
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(hasActiveChild);
  }, [hasActiveChild]);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger asChild>
        <button
          className={`flex w-full items-center justify-between rounded-lg p-4 transition ${open || hasActiveChild ? "bg-linear-to-l from-[#CBA462] to-[#E3C086] text-white" : "hover:bg-primary text-[#727272] hover:text-white"}`}
        >
          <div className="flex items-center gap-3">
            {icon}
            <span className="text-base font-normal">{title}</span>
          </div>
          <ChevronDown
            className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>
      </CollapsibleTrigger>

      <CollapsibleContent className="mt-2 space-y-1 pr-8">
        {data.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={linkClass}
            onClick={onLinkClick}
          >
            - {item.label}
          </NavLink>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default CollapsibleNavDashboard;

import React from "react";
import { useGetClientStatusCount } from "../api/hooks/useGetClientStatusCount";

type ClientStatusCountProps = {
  id: string;
  fallbackCount?: number;
};

export const ClientStatusCount: React.FC<ClientStatusCountProps> = ({
  id,
  fallbackCount = 0,
}) => {
  const { data } = useGetClientStatusCount(id);
  const count = typeof data === "number" ? data : fallbackCount;

  return (
    <div className="flex justify-center">
      <span className="flex size-8 items-center justify-center rounded-md bg-[#A6A6A6] text-xs leading-none font-bold text-white">
        {count}
      </span>
    </div>
  );
};

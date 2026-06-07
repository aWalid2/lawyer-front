import { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import type { DayGroup } from "./types";

interface DayCollapsibleProps {
  group: DayGroup;
}

const sessionCountText = (count: number) => {
  if (count === 1) return "جلسة واحدة";
  if (count === 2) return `${count} جلسة`;
  return `${count} جلسات`;
};

export const DayCollapsible = ({ group }: DayCollapsibleProps) => {
  const [open, setOpen] = useState(false);
  const hasSessions = group.sessions.length > 0;

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger asChild>
        <button
          type="button"
          className="flex w-full cursor-pointer items-center justify-between bg-[#FDFCFA] px-6 py-4 text-right transition-colors hover:bg-[#F9F7F3]"
        >
          <div className="flex flex-1 items-center gap-4">
            <span className="inline-flex items-center rounded-full bg-[#BF9A61]/10 px-3 py-1 text-xs font-bold text-[#BF9A61]">
              {group.label}
            </span>
            <span className="text-base text-gray-500">{group.dateLabel}</span>
            <span className="text-sm font-semibold text-gray-700">
              {sessionCountText(group.totalCount)}
            </span>
          </div>
          <ChevronDown
            className={`h-4 w-4 text-gray-400 transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>
      </CollapsibleTrigger>

      <CollapsibleContent>
        <Table>
          {/* <TableHeader>
            <TableRow className="bg-[#F9F7F3]">
              <TableHead className="px-6 py-5 text-center text-sm font-semibold text-[#153A4D]">
                المحكمة
              </TableHead>
              <TableHead className="px-6 py-5 text-center text-sm font-semibold text-[#153A4D]">
                القضية
              </TableHead>
              <TableHead className="px-6 py-5 text-center text-sm font-semibold text-[#153A4D]">
                الوقت
              </TableHead>
            </TableRow>
          </TableHeader> */}
          <TableBody>
            {hasSessions ? (
              group.sessions.map((session, idx) => (
                <TableRow key={idx}>
                  <TableCell className="px-6 py-5 text-start text-sm text-gray-600">
                    {session?.court || session?.presecution_name}
                  </TableCell>
                  <TableCell className="px-6 py-5 text-center text-sm font-medium text-gray-800">
                    قضية رقم {session.caseNumber}
                  </TableCell>
                  <TableCell className="px-6 py-5 text-center text-sm text-gray-500">
                    {session.time}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="py-8 text-center text-sm text-gray-400"
                >
                  لا توجد جلسات
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CollapsibleContent>
    </Collapsible>
  );
};

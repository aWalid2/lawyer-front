import { addDays } from "date-fns";
import type { DayGroup } from "./types";

export const MOCK_SESSIONS: DayGroup[] = [
  {
    label: "اليوم",
    date: new Date(),
    dateLabel: "",
    sessions: [
      { time: "10:00 ص", caseNumber: "#6341", court: "محكمة التجارة" },
      { time: "12:00 م", caseNumber: "#6312", court: "محكمة الاستئناف" },
      { time: "03:30 م", caseNumber: "#6312", court: "محكمة الأحوال الشخصية" },
    ],
    totalCount: 3,
  },
  {
    label: "غداً",
    date: addDays(new Date(), 1),
    dateLabel: "",
    sessions: [
      { time: "10:00 ص", caseNumber: "#6341", court: "محكمة التجارة" },
      { time: "12:00 م", caseNumber: "#6312", court: "محكمة الاستئناف" },
      { time: "03:30 م", caseNumber: "#6312", court: "محكمة الأحوال الشخصية" },
    ],
    totalCount: 5,
  },
  {
    label: "بعد غد",
    date: addDays(new Date(), 2),
    dateLabel: "",
    sessions: [
      { time: "10:00 ص", caseNumber: "#6341", court: "محكمة التجارة" },
      { time: "12:00 م", caseNumber: "#6312", court: "محكمة الاستئناف" },
      { time: "03:30 م", caseNumber: "#6312", court: "محكمة الأحوال الشخصية" },
    ],
    totalCount: 2,
  },
];

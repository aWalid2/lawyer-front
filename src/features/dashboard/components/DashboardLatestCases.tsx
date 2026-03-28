"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/components/shared/components/DataTable"
import type { Column } from "@/components/shared/components/DataTable"
import { NewCaseLink } from "@/features/cases-mangement/MainCases/componnents/HeaderPageCase/components/NewCaseLink"
import { ViewIcon } from "@/components/shared/icons/View"

type CaseData = {
  id: number
  code: string
  autoNumber: string
  client: string
  lawyer: string
  status: string
  statusType: "active" | "pending"
}

const data: CaseData[] = [
  {
    id: 1,
    code: "#6341",
    autoNumber: "#6341",
    client: "خالد محمد",
    lawyer: "محمد علي",
    status: "متداولة",
    statusType: "active"
  },
  {
    id: 2,
    code: "#6342",
    autoNumber: "#6342",
    client: "خالد محمد",
    lawyer: "محمد علي",
    status: "متداولة",
    statusType: "active"
  },
  {
    id: 3,
    code: "#6343",
    autoNumber: "#6343",
    client: "خالد محمد",
    lawyer: "محمد علي",
    status: "متداولة",
    statusType: "active"
  },
  {
    id: 4,
    code: "#6344",
    autoNumber: "#6344",
    client: "خالد محمد",
    lawyer: "محمد علي",
    status: "متداولة",
    statusType: "active"
  },
  {
    id: 5,
    code: "#6345",
    autoNumber: "#6345",
    client: "خالد محمد",
    lawyer: "محمد علي",
    status: "تحت الرفع",
    statusType: "pending"
  },
]

const getStatusStyles = (status: string) => {
  switch (status) {
    case "متداولة":
      return "bg-[#5570F1]/20 text-[#5570F1]";
    case "تحت الرفع":
      return "bg-[#937F12]/20 text-[#937F12]";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

const columns: Column<CaseData>[] = [
  {
    header: "#",
    accessor: "id",
  },
  {
    header: "كود القضية",
    accessor: "code",
  },
  {
    header: "الرقم الآلي",
    accessor: "autoNumber",
  },
  {
    header: "الموكل",
    accessor: "client",
  },
  {
    header: "المحامي",
    accessor: "lawyer",
  },
  {
    header: "الحالة",
    accessor: (item) => (
      <span
        className={`px-3 py-1 rounded-main text-xs font-medium whitespace-nowrap ${getStatusStyles(
          item.status
        )}`}
      >
        {item.status}
      </span>
    ),
  },
  {
    header: "إجراء",
    accessor: () => (
      <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-500 bg-blue-50 rounded-md hover:bg-blue-100">
        <ViewIcon className="w-4 h-4" />
      </Button>
    ),
  },
]

const DashboardLatestCases = () => {
  return (
    <Card className="flex flex-col border-0 shadow-sm h-full w-full col-span-1 lg:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">أحدث القضايا</CardTitle>
        <NewCaseLink />
      </CardHeader>
      <CardContent>
        <DataTable
          data={data}
          columns={columns}
          rowIdField="id"
        />
      </CardContent>
    </Card>
  )
}

export default DashboardLatestCases

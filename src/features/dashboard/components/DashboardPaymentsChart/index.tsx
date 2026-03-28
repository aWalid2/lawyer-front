
import { Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { ChartConfig } from "@/components/ui/chart"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart"
import { DashboardPaymentChartLegandContent } from "./components/DashboardPaymentChartLegandContent"
import { PaymentRatio } from "./components/PaymentRatio"
import { PieChartTrendingUpIcon } from "./components/PieChartTrendingUpIcon"
import { CustomArcPie } from "./components/CustomArcPie"

const chartData = [
  // Order matters for overlap! Light gray -> Gold -> Blue
  { name: "late", value: 35, fill: "var(--color-late)" },
  { name: "upcoming", value: 20, fill: "var(--color-upcoming)" },
  { name: "received", value: 45, fill: "var(--color-received)" },
]

const chartConfig = {
  received: {
    label: "المستلمة",
    color: '#4B5675', // Dark slate/blue
  },
  late: {
    label: "متأخرة",
    color: "#F1F1F4",
  },
  upcoming: {
    label: "قادمة",
    color: 'var(--color-primary)', // Gold
  },
} satisfies ChartConfig


export default function DashboardPaymentsChart() {
  return (
    <Card className="shadow-primary border-0 gap-0">
      <CardHeader >
        <CardTitle className="text-xl text-[#2F3240] font-semibold">ملخص المدفوعات</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-2 relative">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[236px] pb-0 relative"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={80}
              outerRadius={100}
              startAngle={-30}
              endAngle={330}
              shape={<CustomArcPie />}
              stroke="none"
            />

          </PieChart>

        </ChartContainer>
        <PieChartTrendingUpIcon />

      </CardContent>
      <DashboardPaymentChartLegandContent chartConfig={chartConfig} />
      <CardFooter className="flex-col gap-2 text-sm pt-2 pb-6 px-6">
        <PaymentRatio />
      </CardFooter>
    </Card>
  )
}


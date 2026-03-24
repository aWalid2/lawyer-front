import { Card, CardContent } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { BarChartHeader } from "./BarChartHeader"

const monthlyData = [
  { month: "يناير", total: 4200 },
  { month: "فبراير", total: 5800 },
  { month: "مارس", total: 7500 },
  { month: "أبريل", total: 2200 },
  { month: "مايو", total: 3200 },
  { month: "يونيو", total: 8100 },
  { month: "يوليو", total: 5000 },
  { month: "أغسطس", total: 1200 },
  { month: "سبتمبر", total: 5800 },
  { month: "أكتوبر", total: 2500 },
  { month: "نوفمبر", total: 5000 },
  { month: "ديسمبر", total: 3000 },
]

const yearlyData = [
  { month: "2020", total: 35000 },
  { month: "2021", total: 42000 },
  { month: "2022", total: 38000 },
  { month: "2023", total: 51000 },
  { month: "2024", total: 45000 },
  { month: "2025", total: 58000 },
]

const chartConfig = {
  total: {
    label: "إجمالي المدفوعات",
    color: "var(--color-primary)",
  },
}

const PRIMARY = "var(--color-primary)"
const PRIMARY_LIGHT = "color-mix(in srgb, var(--color-primary) 40%, transparent)"

interface CustomBarProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  index?: number;
}

const CustomBar = (props: CustomBarProps) => {
  const { x, y, width, height, index = 0 } = props
  const fill = index % 2 === 0 ? PRIMARY_LIGHT : PRIMARY

  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      fill={fill}
      rx={4}
      ry={4}
    />
  )
}

interface PaymentsBarChartProps {
  viewType: "monthly" | "yearly";
  setViewType: (val: "monthly" | "yearly") => void;
}

const PaymentsBarChart = ({ viewType, setViewType }: PaymentsBarChartProps) => {
  const chartData = viewType === "monthly" ? monthlyData : yearlyData

  return (
    <Card className="shadow-primary border-0">
      <BarChartHeader viewType={viewType} onValueChange={setViewType} />
      <CardContent>
        <div className="h-[400px] w-full mt-4">
          <ChartContainer config={chartConfig} className="h-full w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="5 5" vertical={false} stroke="#E5E7EB" />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6B7280", fontSize: 12 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6B7280", fontSize: 12 }}
                  dx={-10}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey="total"
                  shape={<CustomBar />}
                  barSize={50}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export default PaymentsBarChart

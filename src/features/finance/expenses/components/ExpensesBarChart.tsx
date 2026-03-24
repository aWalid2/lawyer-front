import { Card, CardContent } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { BarChartHeader } from "./BarChartHeader"

const monthlyData = [
  { month: "يناير", total: 5000 },
  { month: "فبراير", total: 6800 },
  { month: "مارس", total: 8500 },
  { month: "أبريل", total: 3200 },
  { month: "مايو", total: 4200 },
  { month: "يونيو", total: 9100 },
  { month: "يوليو", total: 6000 },
  { month: "أغسطس", total: 1500 },
  { month: "سبتمبر", total: 6800 },
  { month: "أكتوبر", total: 3500 },
  { month: "نوفمبر", total: 6000 },
  { month: "ديسمبر", total: 4000 },
]

const yearlyData = [
  { month: "2020", total: 45000 },
  { month: "2021", total: 52000 },
  { month: "2022", total: 48000 },
  { month: "2023", total: 61000 },
  { month: "2024", total: 55000 },
  { month: "2025", total: 68000 },
]

const chartConfig = {
  total: {
    label: "إجمالي المصروفات",
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

interface ExpensesBarChartProps {
  viewType: "monthly" | "yearly";
  setViewType: (val: "monthly" | "yearly") => void;
}

const ExpensesBarChart = ({ viewType, setViewType }: ExpensesBarChartProps) => {
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

export default ExpensesBarChart

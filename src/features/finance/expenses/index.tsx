import { useState } from "react"
import ExpensesMetricCards from "./components/ExpensesMetricCards"
import ExpensesBarChart from "./components/ExpensesBarChart"

const FinanceExpensesFeature = () => {
  const [viewType, setViewType] = useState<"monthly" | "yearly">("monthly")

  return (
    <div className="flex flex-col gap-6 mt-4">
      <ExpensesMetricCards />
      <ExpensesBarChart viewType={viewType} setViewType={setViewType} />
    </div>
  )
}

export default FinanceExpensesFeature

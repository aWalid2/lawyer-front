import { useState } from "react"
import PaymentsMetricCards from "./components/PaymentsMetricCards"
import PaymentsBarChart from "./components/PaymentsBarChart"

const FinancePaymentsFeature = () => {
  const [viewType, setViewType] = useState<"monthly" | "yearly">("monthly")

  return (
    <div className="flex flex-col gap-6 mt-4">
      <PaymentsMetricCards />
      <PaymentsBarChart viewType={viewType} setViewType={setViewType} />
    </div>
  )
}

export default FinancePaymentsFeature

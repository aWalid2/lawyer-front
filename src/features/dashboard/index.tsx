import { DashboardStats } from "./components/DashboardStats"
import { DashboardPaymentsChart } from "./components/DashboardPaymentsChart"
import { DashboardLatestCases } from "./components/DashboardLatestCases"

export const DashboardFeature = () => {
    return (
        <div className="flex flex-col gap-4  mt-6">
            <DashboardStats />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <DashboardLatestCases />
                <DashboardPaymentsChart />
            </div>
        </div>
    )
}

import DashboardStats from "./components/DashboardStats"
import DashboardPaymentsChart from "./components/DashboardPaymentsChart"
import DashboardLatestCases from "./components/DashboardLatestCases"
import CalendarPicker from "./components/CalendarPicker"
import IncompleteProcedures from "./components/IncompleteProcedures"

export const DashboardFeature = () => {
    return (
        <div className="flex flex-col  mt-6">
            <DashboardStats />
            <div className="grid grid-cols-1  xl:grid-cols-3 gap-4 mt-4">
                <DashboardLatestCases />
                <DashboardPaymentsChart />
            </div>

            <CalendarPicker selectedDate={undefined} onDateSelect={() => { }} />
            <IncompleteProcedures />

        </div>
    )
}

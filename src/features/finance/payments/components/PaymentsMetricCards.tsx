import { SettingsLawIcon } from "@/components/shared/icons/SettingsLaw"
import { TextIcon } from "@/components/shared/icons/Text"
import { WalletIcon } from "@/components/shared/icons/Wallet"
import { Card, CardContent } from "@/components/ui/card"

const metricsData = [
  { title: "إيجار", amount: "5000 دينار", icon: SettingsLawIcon, iconColor: "text-primary", bgColor: "bg-primary/20" },
  { title: "مدفوعات قضايا", amount: "4000 دينار", icon: WalletIcon, iconColor: "text-success", bgColor: "bg-success/20" },
  { title: "خدمات أخرى", amount: "1000 دينار", icon: TextIcon, iconColor: "text-alert", bgColor: "bg-alert/20" },
  { title: "رواتب", amount: "10,000 دينار", icon: TextIcon, iconColor: "text-[#5570F1]", bgColor: "bg-[#5570F1]/20" },
]

const PaymentsMetricCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metricsData.map((metric, index) => (
        <Card key={index} className="shadow-primary border-0">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-2xl font-semibold">{metric.amount}</span>
              <span className="text-base text-gray-500 font-normal">{metric.title}</span>
            </div>
            <div className={`p-3 rounded-full h-15 w-15 flex items-center justify-center ${metric.bgColor}`}>
              <metric.icon className={metric.iconColor} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default PaymentsMetricCards

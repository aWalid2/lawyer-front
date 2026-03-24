import { CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface BarChartHeaderProps {
    viewType: "monthly" | "yearly";
    onValueChange: (val: "monthly" | "yearly") => void;
}

export const BarChartHeader = ({ viewType, onValueChange }: BarChartHeaderProps) => {
    return (
        <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold text-secondary">إجمالي المدفوعات</CardTitle>
            <div className="w-28 ">
                <Select value={viewType} onValueChange={onValueChange as (val: string) => void}>
                    <SelectTrigger className="bg-white rounded-2xl w-full">
                        <SelectValue placeholder="شهرياً" />
                    </SelectTrigger>
                    <SelectContent className="bg-white rounded-2xl w-(--radix-select-trigger-width)">
                        <SelectItem value="monthly">شهرياً</SelectItem>
                        <SelectItem value="yearly">سنوياً</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </CardHeader>
    )
}

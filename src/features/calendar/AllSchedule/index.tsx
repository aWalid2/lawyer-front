import { Button } from "@/components/ui/button";
import { Filter, Search } from "lucide-react";
import { Link } from "react-router-dom";

export const AllScheduleFeatures = () => {
  return (
    <div className="mb-6 flex w-full items-center justify-between">
      <h2 className="text-secondary text-2xl font-bold">جدول المواعيد</h2>
      <div className="flex items-center gap-4">
        <Button className="flex items-center gap-2">
          <Filter />
          تصفية حسب التاريخ
        </Button>
        <Button className="flex items-center gap-2">
          <Search />
          بحث
        </Button>
        <Link to="/dashboard/daily-schedule">
          <Button className="bg-secondary text-white">جدول اليوم</Button>
        </Link>
      </div>
    </div>
  );
};

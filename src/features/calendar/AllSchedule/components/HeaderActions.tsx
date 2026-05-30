import { Button } from "@/components/ui/button";
import { Filter, Search } from "lucide-react";
import { Link } from "react-router-dom";

const HeaderActions = () => {
  return (
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
  );
};

export default HeaderActions;

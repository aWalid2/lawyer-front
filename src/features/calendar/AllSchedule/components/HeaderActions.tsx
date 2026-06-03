import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeaderActions = () => {
  return (
    <div className="flex items-center gap-4">
      <Link to="/dashboard/daily-schedule">
        <Button className="bg-secondary text-white">جدول اليوم</Button>
      </Link>
    </div>
  );
};

export default HeaderActions;

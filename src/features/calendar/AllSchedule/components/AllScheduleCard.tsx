import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, Clock, MapPin, User } from "lucide-react";

const AllScheduleCard = ({ schedule }: { schedule: any }) => {
  return (
    <Card className="border-border/50 transition-all hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-secondary text-xl font-bold">
            {schedule.title}
          </CardTitle>
          <span className="bg-primary/10 text-primary rounded-full px-2.5 py-0.5 text-xs font-medium">
            {schedule.type}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="text-muted-foreground flex items-center gap-3 text-sm">
            <div className="bg-secondary/5 rounded-md p-2">
              <CalendarIcon className="text-primary h-4 w-4" />
            </div>
            <span className="text-foreground/80 font-medium">
              {schedule.date}
            </span>
          </div>
          <div className="text-muted-foreground flex items-center gap-3 text-sm">
            <div className="bg-secondary/5 rounded-md p-2">
              <Clock className="text-primary h-4 w-4" />
            </div>
            <span className="text-foreground/80 font-medium">
              {schedule.time}
            </span>
          </div>
          <div className="text-muted-foreground flex items-center gap-3 text-sm">
            <div className="bg-secondary/5 rounded-md p-2">
              <User className="text-primary h-4 w-4" />
            </div>
            <span className="text-foreground/80 font-medium">
              {schedule.client}
            </span>
          </div>
          <div className="text-muted-foreground flex items-center gap-3 text-sm">
            <div className="bg-secondary/5 rounded-md p-2">
              <MapPin className="text-primary h-4 w-4" />
            </div>
            <span className="text-foreground/80 font-medium">
              {schedule.location}
            </span>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button className="text-primary text-sm font-semibold transition-all hover:underline">
            عرض التفاصيل
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AllScheduleCard;

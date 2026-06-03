import { useNavigate } from "react-router-dom";

interface Event {
  id: string;
  title: string;
  lawyer: string;
  location: string;
  startTime: string; // e.g. "10:00"
  endTime: string; // e.g. "11:00"
}

export const DayCard = ({
  event,
  colIndex,
  rowIndex,
}: {
  event: Event;
  colIndex: number;
  rowIndex: number;
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/dashboard/user-tasks/${event.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="border-primary/10 pointer-events-auto flex h-full w-full cursor-pointer flex-col items-center justify-center border bg-[#fdf8f0] p-2 text-center shadow-sm transition-all hover:brightness-95"
      style={{
        gridColumnStart: colIndex + 1,
        gridRowStart: rowIndex + 1,
      }}
    >
      <h4 className="text-secondary mb-1 line-clamp-1 text-xs font-bold">
        {event.title}
      </h4>
      <p className="text-paragraph line-clamp-1 text-[10px]">{event.lawyer}</p>
      <p className="text-paragraph line-clamp-1 text-[10px]">
        {event.location}
      </p>
    </div>
  );
};

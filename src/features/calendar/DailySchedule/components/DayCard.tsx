interface Event {
    id: string;
    title: string;
    lawyer: string;
    location: string;
    startTime: string; // e.g. "10:00"
    endTime: string;   // e.g. "11:00"
}

export const DayCard = ({ event, colIndex, rowIndex }: { event: Event, colIndex: number, rowIndex: number }) => {
    return (
        <div
            className="pointer-events-auto bg-[#fdf8f0] border border-primary/10 p-2 flex flex-col justify-center items-center text-center shadow-sm hover:brightness-95 transition-all w-full h-full"
            style={{
                gridColumnStart: colIndex + 1,
                gridRowStart: rowIndex + 1,
            }}
        >
            <h4 className="text-secondary font-bold text-xs mb-1 line-clamp-1">{event.title}</h4>
            <p className="text-paragraph text-[10px] line-clamp-1">{event.lawyer}</p>
            <p className="text-paragraph text-[10px] line-clamp-1">{event.location}</p>
        </div>
    )
}

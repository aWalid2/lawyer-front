import React from "react";
import { DayCard } from "./DayCard";

interface Event {
  id: string;
  title: string;
  lawyer: string;
  location: string;
  startTime: string; // e.g. "10:00"
  endTime: string; // e.g. "11:00"
}

interface EventsGridProps {
  events: Event[];
  times: string[];
}

export const EventsGrid = ({ events, times }: EventsGridProps) => {
  return (
    <>
      {events.map((event) => {
        const colIndex = times.indexOf(event.startTime);
        if (colIndex === -1) return null;

        // Find which row this event should occupy if multiple events start at the same time
        const rowIndex = events
          .filter((e) => e.startTime === event.startTime)
          .indexOf(event);

        return (
          <DayCard
            key={event.id}
            event={event}
            colIndex={colIndex}
            rowIndex={rowIndex}
          />
        );
      })}
    </>
  );
};

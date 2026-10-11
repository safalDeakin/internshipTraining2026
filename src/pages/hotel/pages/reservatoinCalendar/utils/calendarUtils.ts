
import { DAYS, ROOMS, } from "../data/reservationData";
import type { Reservation, Room, Status } from "../types/reservation";


//For Responsive Design of the Calendar 
export const ROOM_COLUMN_WIDTH = 176;
export const MIN_SLOT_WIDTH = 28;

export const SLOTS_PER_DAY = 8;
export const DAYS_PER_WEEK = 7;

export const TOTAL_WEEK_SLOTS =
  SLOTS_PER_DAY * DAYS_PER_WEEK;

export const MIN_TIMELINE_CONTENT_WIDTH =
  TOTAL_WEEK_SLOTS * MIN_SLOT_WIDTH;

export const MIN_CALENDAR_WIDTH =
  ROOM_COLUMN_WIDTH +
  MIN_TIMELINE_CONTENT_WIDTH;

//Responsive Breakpoints
export const COMPACT_WIDTH = 768;
export const ROTATE_WIDTH = 600;



//For Drag And Drop -->Start

// Room Helper
export function getRoomById(
  roomId: string
): Room | undefined {
  return ROOMS.find(
    (room) => room.id === roomId
  );
}


// Check room type compatibility
export function canMoveReservation(
  sourceRoom: Room,
  targetRoom: Room
): boolean {
  return sourceRoom.type === targetRoom.type;
}


// Room type validation message
export function getMoveValidationMessage(
  sourceRoom: Room,
  targetRoom: Room
): string {
  if (
    sourceRoom.type === targetRoom.type
  ) {
    return `Move to room ${targetRoom.id}`;
  }

  return `This reservation can only be moved to a ${sourceRoom.type} room.`;
}


// Calculate snapped drop slot
export function calculateDropSlot(
  event: React.DragEvent<HTMLDivElement>,
  reservation: Reservation,
  totalSlots: number,
  dragOffsetX = 0
): number {
  const timeline =
    event.currentTarget;

  const rect =
    timeline.getBoundingClientRect();

  const scrollContainer =
    timeline.closest(
      ".calendar-scroll-container"
    ) as HTMLElement | null;

  const scrollLeft =
    scrollContainer?.scrollLeft ?? 0;

  const mouseX =
    event.clientX -
    rect.left +
    scrollLeft;

  const reservationLeftX =
    mouseX - dragOffsetX;

  const timelineWidth =
    timeline.offsetWidth;

  const rawSlot =
    (reservationLeftX / timelineWidth) *
    totalSlots;

  const targetSlot =
    Math.round(rawSlot);

  const maxStartSlot =
    totalSlots -
    reservation.span;

  return Math.max(
    0,
    Math.min(
      maxStartSlot,
      targetSlot
    )
  );
}


// Checks the reservation overlap
export function hasReservationOverlap(
  reservations: Reservation[],
  startSlot: number,
  span: number,
  draggedReservationId: string
): boolean {
  const newEndSlot =
    startSlot + span;

  return reservations.some(
    (reservation) => {
      // Ignores the reservation currently being dragged
      if (
        reservation.id ===
        draggedReservationId
      ) {
        return false;
      }

      const existingStart =
        reservation.startSlot;

      const existingEnd =
        reservation.startSlot +
        reservation.span;

      return (
        startSlot < existingEnd &&
        newEndSlot > existingStart
      );
    }
  );
}

//--> Drag And Drop Ends


export function getSundayOfWeek(date: Date) {
  const result = new Date(date);

  result.setDate(
    result.getDate() - result.getDay()
  );

  return result;
}

export function getWeekDates(sunday: Date) {
  return DAYS.map((_, index) => {
    const date = new Date(sunday);

    date.setDate(
      sunday.getDate() + index
    );

    return date;
  });
}


export function isSameDay(
  first: Date,
  second: Date
) {
  return (
    first.getDate() === second.getDate() &&
    first.getMonth() === second.getMonth() &&
    first.getFullYear() === second.getFullYear()
  );
}

//Colors and Custom Css for the legends
export function getStatusColors(status: Status) {
  switch (status) {
    case "Available":
      return {
        bg: "#b2dfdb",
        border: "#4db6ac",
        text: "#00695c",
      };

    case "Reserved":
      return {
        bg: "#b3e5fc",
        border: "#4fc3f7",
        text: "#0277bd",
      };

    case "Occupied":
      return {
        bg: "#80cbc4",
        border: "#26a69a",
        text: "#004d40",
      };

    case "Out of Service":
      return {
        bg: "#ffcdd2",
        border: "#ef9a9a",
        text: "#c62828",
      };
  }
}



//Custom css color for the legends
export function getDotColor(status: Status) {
  switch (status) {
    case "Available":
      return "#4db6ac";

    case "Reserved":
      return "#4fc3f7";

    case "Occupied":
      return "#26a69a";

    case "Out of Service":
      return "#ef9a9a";
  }
}


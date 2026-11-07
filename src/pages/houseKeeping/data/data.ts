import type { Room } from "../../../domain/houseKeeping"


const roomDetails: Array<Pick<Room, "number" | "floor" | "type" | "housekeepingStatus" | "checkOut">> =
  [
    {
      number: "101",
      floor: "1",
      type: "Deluxe",
      housekeepingStatus: "Dirty",
      checkOut: "2083/01/10",
    },
    {
      number: "102",
      floor: "1",
      type: "Deluxe",
      housekeepingStatus: "Inspection",
      checkOut: "—",
    },
    {
      number: "103",
      floor: "1",
      type: "Standard",
      housekeepingStatus: "Dirty",
      checkOut: "2083/01/10",
    },
    {
      number: "104",
      floor: "1",
      type: "Standard",
      housekeepingStatus: "Dirty",
      checkOut: "2083/01/10",
    },
    {
      number: "105",
      floor: "2",
      type: "Standard",
      housekeepingStatus: "Dirty",
      checkOut: "2083/01/10",
    },
    {
      number: "106",
      floor: "1",
      type: "Deluxe",
      housekeepingStatus: "Dirty",
      checkOut: "2083/01/10",
    },
    {
      number: "107",
      floor: "2",
      type: "Standard",
      housekeepingStatus: "Dirty",
      checkOut: "2083/01/10",
    },
    {
      number: "201",
      floor: "2",
      type: "Suite",
      housekeepingStatus: "Clean",
      checkOut: "2083/01/11",
    },
    {
      number: "202",
      floor: "2",
      type: "Deluxe",
      housekeepingStatus: "In Progress",
      checkOut: "2083/01/11",
    },
    {
      number: "203",
      floor: "2",
      type: "Deluxe",
      housekeepingStatus: "Dirty",
      checkOut: "2083/01/12",
    },
  ]

export const rooms: Room[] = roomDetails.map((room, index) => ({
  id: index + 1,
  roomStatus: index === 8 ? "Occupied" : "Vacant",
  issueType:
    index === 0
      ? "AC Issue"
      : index === 1
        ? "TV Issue"
        : index === 8
          ? "Electrical Issue"
          : "Plumbing Issue",
  maintenanceStatus:
    index < 2 ? "Pending" : index === 9 ? "Completed" : "In Progress",
  remark:
    index === 0
      ? "AC Not Working"
      : index === 1
        ? "TV Not Turning On"
        : index === 8
          ? "Bedside Lamp"
          : "Leakage In Bathroom",
  performedBy: index === 8 ? "Anita Rai" : "Deep Sharma",
  lastClean: "2083/01/01",
  nextClean: "2083/01/03",
  ...room,
}))

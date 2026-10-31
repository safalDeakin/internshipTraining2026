import type { Room, StatusSummary } from "../model/roomStatusTypes";

export class RoomStatusRepository {
    getRooms(): Room[] {
        return [
            { id: 101, number: "101", type: "Deluxe", floor: 1, guestOrReservation: "RV-#2122", status: "Reserved", remarks: "—", lastUpdated: "2083/01/02" },
            { id: 102, number: "102", type: "Deluxe", floor: 1, guestOrReservation: "—", status: "Vacant", remarks: "—", lastUpdated: "2083/01/02" },
            { id: 103, number: "103", type: "Standard", floor: 2, guestOrReservation: "RV-#2124", status: "Reserved", remarks: "—", lastUpdated: "2083/01/02" },
            { id: 104, number: "104", type: "Deluxe", floor: 1, guestOrReservation: "RV-#2125", status: "Reserved", remarks: "—", lastUpdated: "2083/01/02" },
            { id: 105, number: "105", type: "Suite", floor: 1, guestOrReservation: "RV-#2122", status: "Reserved", remarks: "—", lastUpdated: "2083/01/02" },
            { id: 106, number: "106", type: "Standard", floor: 2, guestOrReservation: "—", status: "Vacant", remarks: "—", lastUpdated: "2083/01/02" },
            { id: 107, number: "107", type: "Deluxe", floor: 1, guestOrReservation: "—", status: "Dirty", remarks: "Pending housekeeping", lastUpdated: "2083/01/02" },
            { id: 108, number: "108", type: "Standard", floor: 2, guestOrReservation: "—", status: "Vacant", remarks: "—", lastUpdated: "2083/01/02" },
            { id: 109, number: "109", type: "Deluxe", floor: 1, guestOrReservation: "—", status: "Out of Service", remarks: "Bathroom maintenance required", lastUpdated: "2083/01/02" },
            { id: 110, number: "110", type: "Standard", floor: 2, guestOrReservation: "—", status: "Vacant", remarks: "—", lastUpdated: "2083/01/02" },
        ];
    }

    getStatusSummaries(): StatusSummary[] {
        return [
            { label: "Occupied", value: 105, tone: "blue" },
            { label: "Vacant", value: 58, tone: "lavender" },
            { label: "Dirty", value: 15, tone: "purple" },
            { label: "Clean", value: 42, tone: "indigo" },
            { label: "Blocked", value: 2, tone: "red" },
            { label: "Maintenance", value: 5, tone: "pink" },
        ];
    }
}

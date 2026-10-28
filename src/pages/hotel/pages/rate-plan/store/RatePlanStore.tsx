
import { staticRoomRates, staticTimelineRates } from "../data/data";

import type {
    DayKey,
    DialogName,
    NewRoomRate,
    RoomRate,
    TimelineRate,
} from "../types/types";

export interface RatePlanState {
    rooms: RoomRate[];
    timeline: TimelineRate[];
    dialog: DialogName;
    selectedRoom: RoomRate | null;
}

export class RatePlanStore {
    private state: RatePlanState = {
        rooms: staticRoomRates,
        timeline: staticTimelineRates,
        dialog: null,
        selectedRoom: null,
    };

    private listeners = new Set<() => void>();

    getSnapshot = (): RatePlanState => this.state;

    subscribe = (listener: () => void) => {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener);
    };

    private setState = (
        update:
            | Partial<RatePlanState>
            | ((state: RatePlanState) => Partial<RatePlanState>),
    ) => {
        const changes =
            typeof update === "function"
                ? update(this.state)
                : update;

        this.state = { ...this.state, ...changes };

        this.listeners.forEach((listener) => listener());
    };

    openAddDialog = () => {
        this.setState({ dialog: "add" });
    };

    openUpdateDialog = () => {
        this.setState({ dialog: "update" });
    };

    closeDialog = () => {
        this.setState({ dialog: null });
    };

    showRoomDetails = (room: RoomRate) => {
        this.setState({ selectedRoom: room });
    };

    closeRoomDetails = () => {
        this.setState({ selectedRoom: null });
    };

    addRoomRate = (newRoom: NewRoomRate) => {
        const id = `${newRoom.code.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now()}`;
        const colors = ["#0e8a9b", "#d15d7f", "#6c7a2d", "#8250df"];

        const room: RoomRate = {
            ...newRoom,
            id,
            color: colors[this.state.rooms.length % colors.length],
            roomNo: "",
            status: "Available",
            roomNumbers: [],
            additionalRateType: "fixed"
        };

        const rates: Record<DayKey, number> = {
            Monday: room.baseRate,
            Tuesday: room.baseRate,
            Wednesday: room.baseRate,
            Thursday: room.baseRate,
            Friday: room.baseRate,
            Saturday: room.baseRate,
            Sunday: room.baseRate,
        };

        this.setState((state) => ({
            rooms: [...state.rooms, room],
            timeline: [...state.timeline, { roomId: id, rates }],
            dialog: null,
        }));
    };

    updateTimelineRate = (
        roomId: string,
        day: DayKey,
        rate: number,
    ) => {
        this.setState((state) => ({
            timeline: state.timeline.map((entry) =>
                entry.roomId === roomId
                    ? {
                        ...entry,
                        rates: { ...entry.rates, [day]: rate },
                    }
                    : entry,
            ),
            dialog: null,
        }));
    };
}

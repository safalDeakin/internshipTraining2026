import type { POSSession } from "../types/posSessionTypes";

// this will render in that fist modal multiple button
export const posInitialData: POSSession[] = [
  // Active session
  {
    id: "POS-001",
    staffId: "STAFF-001",
    staffName: "Ram Sharma",
    terminal: "POS Terminal 1",
    date: "2026-11-24",
    mode: "Standard",
    organizationId: "hotel-everest",

    startTime: "2026-11-24T08:00:00+05:45",
    endTime: null,
    pausedAt: null,

    status: "active",

    openingCash: 7000,
    closingCash: undefined,

    openingNotes: "Morning shift opening cash",
    closingNotes: undefined,

    totalPausedDurationMs: 0,

    isApproved: true,
    isVerified: true,
  },

  // Completed session
  {
    id: "POS-002",
    staffId: "STAFF-002",
    staffName: "Sita Thapa",
    terminal: "POS Terminal 2",
    date: "2026-11-23",
    mode: "Standard",
    organizationId: "hotel-everest",

    startTime: "2026-11-23T07:00:00+05:45",
    endTime: "2026-11-23T15:00:00+05:45",
    pausedAt: null,

    status: "ended",

    openingCash: 5000,
    closingCash: 8500,

    openingNotes: "Morning shift",
    closingNotes: "Shift completed successfully",

    totalPausedDurationMs: 1800000,

    isApproved: true,
    isVerified: true,
  },

  // Active manager session
  {
    id: "POS-003",
    staffId: "STAFF-003",
    staffName: "Hari Gurung",
    terminal: "POS Terminal 3",
    date: "2026-11-24",
    mode: "Manager Mode",
    organizationId: "hotel-annapurna",

    startTime: "2026-11-24T09:00:00+05:45",
    endTime: null,
    pausedAt: null,

    status: "active",

    openingCash: 10000,
    closingCash: undefined,

    openingNotes: "Manager session",
    closingNotes: undefined,

    totalPausedDurationMs: 0,

    isApproved: true,
    isVerified: false,
  },
];

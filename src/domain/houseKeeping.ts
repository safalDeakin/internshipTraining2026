export type Page = "overview" | "selection" | "preview"
export type TaskType = "housekeeping" | "maintenance"

export type Room = {
    id: number
    number: string
    floor: string
    type: "Deluxe" | "Standard" | "Suite"
    roomStatus: "Vacant" | "Occupied"
    housekeepingStatus: "Clean" | "Dirty" | "Inspection" | "In Progress"
    maintenanceStatus: "Pending" | "In Progress" | "Completed"
    issueType: "AC Issue" | "TV Issue" | "Plumbing Issue" | "Electrical Issue"
    remark: string
    performedBy: string
    lastClean: string
    nextClean: string
    checkOut: string
}

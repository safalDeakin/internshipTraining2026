import { useState } from "react"
import type { Page, TaskType } from "../../../domain/houseKeeping"
import { RoomSelectionPage } from "./RoomSelectionPage"
import { TaskSheetPreview } from "./TaskSheetPreview"
import { OverviewPage } from "./OverviewPage"
import { useRepoHouseKeepingHook } from "../context/HouseKeepingProvider"


export default function HouseKeepingPage() {
    const { data } = useRepoHouseKeepingHook();
  const [page, setPage] = useState<Page>("overview")
  const [taskType, setTaskType] = useState<TaskType>("housekeeping")
  const [selectedRoomIds, setSelectedRoomIds] = useState<number[]>([])

  const startTask = (type: TaskType) => {
    setTaskType(type)
    setSelectedRoomIds([])
    setPage("selection")
  }

  if (page === "selection") {
    return (
      <RoomSelectionPage
        rooms={data}
        taskType={taskType}
        selectedRoomIds={selectedRoomIds}
        onSelectionChange={setSelectedRoomIds}
        onCancel={() => setPage("overview")}
        onSave={() => setPage("preview")}
      />
    )
  }

  if (page === "preview") {
    return (
      <TaskSheetPreview
        rooms={data.filter((room) => selectedRoomIds.includes(room.id))}
        taskType={taskType}
        onBack={() => setPage("selection")}
      />
    )
  }

  return (
    <OverviewPage
      rooms={data}
      onAddHousekeepingTask={() => startTask("housekeeping")}
      onAddMaintenanceTask={() => startTask("maintenance")}
    />
  )
}

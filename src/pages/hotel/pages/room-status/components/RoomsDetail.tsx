import { useRoomStatusStore } from "../context/RoomStatusContext";
import { PageHeader } from "./PageHeader";
import { RoomFilters } from "./RoomFilters";
import { RoomTable } from "./RoomTable";
import { StatusSummaryCards } from "./StatusSummaryCards";
import "../../../css/room-status/roomStatus.css"

export function RoomsDetail() {
    const { snapshot, stateholder } = useRoomStatusStore();
    const selectedCount = snapshot.selectedRoomIds.size;

    return (
        <div className="rooms-page">
            <PageHeader />
            <div className="content">
                <StatusSummaryCards summaries={snapshot.summaries} />
                <RoomFilters filters={snapshot.filters} onChange={stateholder.setFilter} />

                <section className="room-list">
                    <div className="list-toolbar">
                        <div>
                            <h2>Room directory</h2>
                            <p>{snapshot.rooms.length} rooms shown</p>
                        </div>
                        <div className="selection-actions">
                            <span><strong>{selectedCount}</strong> selected</span>
                            {selectedCount > 0 && (
                                <button className="text-button" onClick={stateholder.clearSelection} type="button">
                                    Clear selection
                                </button>
                            )}
                            <select aria-label="Bulk update status" defaultValue="">
                                <option disabled value="">Bulk update status</option>
                                <option>Vacant</option>
                                <option>Dirty</option>
                                <option>Clean</option>
                                <option>Blocked</option>
                            </select>
                            <button className="button primary" disabled={selectedCount === 0} type="button">
                                Update selected rooms
                            </button>
                        </div>
                    </div>

                    <RoomTable
                        onToggle={stateholder.toggleRoom}
                        onToggleAll={stateholder.toggleAll}
                        rooms={snapshot.rooms}
                        selectedRoomIds={snapshot.selectedRoomIds}
                    />
                </section>
            </div>
        </div>
    );
}

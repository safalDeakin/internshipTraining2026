import { useReservationState } from '../../../../../hooks/allReservation/useReservationState';

function InfoRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex py-2 border-b border-gray-50 last:border-0">
            <span className="w-44 text-xs text-gray-500 shrink-0">{label}</span>
            <span className="text-xs text-gray-800">{value}</span>
        </div>
    );
}

export default function RoomTab() {
    const { selectedReservation: r } = useReservationState();

    return (
        <div className="py-4 px-2">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Room Details</h3>
            <div className="border border-gray-200 rounded p-3">
                <InfoRow label="Room Number" value={r.room.number} />
                <InfoRow label="Room Type" value={r.room.type} />
                <InfoRow label="Floor" value={r.room.floor} />
                <InfoRow label="Bed Type" value={r.room.bedType} />
                <InfoRow label="Smoking Policy" value={r.room.smoking} />
                <InfoRow label="Occupancy" value={r.room.occupancy} />
            </div>

            <div className="mt-4">
                <h3 className="text-sm font-semibold text-gray-800 mb-3">Room Amenities</h3>
                <div className="grid grid-cols-2 gap-2">
                    {['Air Conditioning', 'Free Wi-Fi', 'Flat Screen TV', 'Mini Bar', 'Room Safe', 'Hair Dryer'].map(
                        (amenity) => (
                            <div key={amenity} className="flex items-center gap-2 text-xs text-gray-600">
                                <span className="w-2 h-2 rounded-full bg-green-400" />
                                {amenity}
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}

import type { HallReservation } from "../../../../../../domain/hallReservation";
import { DataTable } from "../common/DataTable";
import { DetailList } from "../common/DetailList";

interface CustomerDetailsProps {
    hallData: HallReservation

}
export function CustomerDetails({
    hallData,
}:
    CustomerDetailsProps
) {

    if (!hallData) {
        return (
            <div className="p-5 text-sm text-slate-400">
                No reservation selected.
            </div>
        );
    }

    return (
        <div className="px-4 py-2 sm:px-5">
            <div className="columns-1 gap-14 xl:columns-2">
                <DetailList title="Guest Information" items={hallData.guest} />
                <DetailList title="Hall / Venue Information" items={hallData.venue} />
                <DetailList title="Event Information" items={hallData.event} />
            </div>

            <h3 className="mb-1 font-semibold text-slate-900">Event Agenda</h3>
            <DataTable headings={["Start Time", "End Time", "Activity/ Agenda", "Location", "Set Up"]}>
                {hallData.agenda.map((item, index) => (
                    <tr key={`${item.start}-${index}`}>
                        <td className="px-3 py-1">{item.start}</td>
                        <td className="px-3 py-1">{item.end}</td>
                        <td className="px-3 py-1 font-medium">{item.activity}</td>
                        <td className="px-3 py-1">{item.location}</td>
                        <td className="px-3 py-1">{item.setup}</td>
                    </tr>
                ))}
            </DataTable>
        </div>
    );
}

import type { HallReservation } from "../../../../../../domain/hallReservation";
import { DataTable } from "../common/DataTable";


interface EventFolioProps {
    hallData: HallReservation
}

export function EventFolio({ hallData }: EventFolioProps) {


    return (
        <section className="p-4 sm:p-5">
            <div>
                <dl className="mb-4 grid max-w-sm grid-cols-[105px_1fr] gap-y-0.5">
                    <dt>Event Name:</dt>
                    <dd className="font-medium">Nia & Dev Wedding</dd>
                    <dt>Event Type:</dt>
                    <dd>Wedding</dd>
                    <dt>Event Date:</dt>
                    <dd>2083/11/12</dd>
                    <dt>Start Time:</dt>
                    <dd>10:00 AM</dd>
                    <dt>End Time:</dt>
                    <dd>6 PM</dd>
                    <dt>Hall / Venue:</dt>
                    <dd>Grand Ballroom</dd>
                    <dt>No Of Pax</dt>
                    <dd>200</dd>
                </dl>

                <DataTable
                    headings={["Date", "Ref No", "Description", "Category", "Qty / Pax", "Amount", "Type"]}
                    minWidth="min-w-[760px]"
                >
                    {hallData.folio.map((item: any) => (
                        <tr key={item.reference}>
                            <td className="px-3 py-2 text-sky-600">{item.date}</td>
                            <td className="px-3 py-2">{item.reference}</td>
                            <td className="px-3 py-2">{item.description}</td>
                            <td className="px-3 py-2">{item.category}</td>
                            <td className="px-3 py-2">{item.quantity}</td>
                            <td className="px-3 py-2">{item.amount}</td>
                            <td className="px-3 py-2">{item.type}</td>
                        </tr>
                    ))}
                </DataTable>

                <h3 className="mt-6 rounded-sm border border-slate-300 px-3 py-2 font-semibold text-slate-900">
                    Payment Summary
                </h3>
                <div className="mt-3">
                    <DataTable headings={["Date", "Payment Type", "Description", "Reference No", "Amount"]}>
                        {hallData.payments.map((item) => (
                            <tr key={item.reference}>
                                <td className="px-3 py-2 text-sky-600">{item.date}</td>
                                <td className="px-3 py-2">{item.paymentType}</td>
                                <td className="px-3 py-2">{item.description}</td>
                                <td className="px-3 py-2">{item.reference}</td>
                                <td className="px-3 py-2">{item.amount}</td>
                            </tr>
                        ))}
                    </DataTable>
                </div>
            </div>
        </section>
    );
}

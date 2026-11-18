
import type { GuestRequest } from "../../../../../domain/GuestRequest";
import Container from "../../../../../lib/component/Container/Container";
import { BillingTable } from "./BillingTable";
import { DetailItem } from "./DetailItem";

export function RequestDetails({ request }: { request: GuestRequest }) {
    return (
        <Container>
            <section>
                <div className="grid border-b border-rose-100 bg-rose-50/70 lg:grid-cols-2">
                    <div className="p-3 sm:px-4">
                        <h3 className="mb-1 text-[11px] font-bold">Particulars</h3>
                        <dl>
                            <DetailItem label="Room" value={request.room} strong />
                            <DetailItem label="Reservation No" value={request.reservation} />
                            <DetailItem label="Name" value={request.guestName} />
                            <DetailItem label="Stay" value={request.stay} />
                        </dl>
                    </div>
                    <div className="border-t border-rose-100 p-3 sm:px-4 lg:border-l lg:border-t-0">
                        <h3 className="mb-1 text-[11px] font-bold">Service Information</h3>
                        <dl>
                            <DetailItem label="Service Type" value={request.serviceType} />
                            <DetailItem label="Quantity" value={request.quantity} />
                            <DetailItem label="Requested Date" value={request.requestedDate} />
                            <DetailItem label="Requested Time" value={request.requestedTime} />
                            <DetailItem label="Expected Time" value={request.expectedTime} />
                        </dl>
                    </div>
                </div>

                <div className="p-3 sm:p-4">
                    <div className="mb-4">
                        <h3 className="mb-1 text-[11px] font-bold">Assigned & Completion Detail</h3>
                        <dl className="max-w-lg">
                            <DetailItem label="Assigned To" value={request.assignedTo} />
                            <DetailItem label="Completed By" value={request.completedBy} />
                            <DetailItem label="Completed At" value={request.completedAt} />
                        </dl>
                    </div>
                    <div className="mb-3">
                        <h3 className="text-[11px] font-bold">Note</h3>
                        <p className="mt-0.5 text-[clamp(10px,0.7vw,12px)] text-slate-700">{request.note}</p>
                    </div>
                    <div>
                        <h3 className="mb-1 text-[11px] font-bold">Billing</h3>
                        <BillingTable items={request.billItems} />
                    </div>
                </div>
            </section>
        </Container>
    );
}

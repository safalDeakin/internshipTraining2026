import type { FolioData } from "../data/guestCheckout.data"


type GuestDetailsProps = {
    guest: FolioData["guest"]
}

export function GuestDetails({ guest }: GuestDetailsProps) {
    return (
        <section className="px-4 py-4 sm:px-5 sm:py-5">
            <h1 className="mb-4 text-sm font-semibold text-slate-900 sm:text-base">
                Stay &amp; Guest Details
            </h1>

            <div className="grid grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
                {guest.details.map((detail, index) => (
                    <div
                        className={index >= 4 ? "lg:col-span-1" : undefined}
                        key={`${detail.label}-${index}`}
                    >
                        <p className="text-[10px] leading-tight text-slate-400 sm:text-[11px]">
                            {detail.label}
                        </p>
                        <p
                            className={`mt-1 text-xs font-medium leading-tight sm:text-sm ${detail.accent ? "text-blue-500" : "text-slate-900"
                                }`}
                        >
                            {detail.value}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    )
}

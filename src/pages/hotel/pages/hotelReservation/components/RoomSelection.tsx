import { ArrowRight, Building2, CalendarDays, Check, ChevronDown, Trash2, Users } from 'lucide-react'
import { roomImage, rooms } from '../data/reservation'

type Props = {
    selectedRoomIds: number[]
    onToggleRoom: (id: number) => void
    onNext: () => void
}

export function RoomSelection({ selectedRoomIds, onToggleRoom, onNext }: Props) {
    const selectedRooms = rooms.filter((room) => selectedRoomIds.includes(room.id))
    const subtotal = selectedRooms.reduce((sum, room) => sum + room.price, 0)

    return (
        <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_19rem]">
            <div>
                <div className="mb-5">
                    <p className="text-xl font-bold sm:text-2xl">Choose your room</p>
                </div>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
                    {rooms.map((room) => {
                        const selected = selectedRoomIds.includes(room.id)
                        return (
                            <article
                                className={`overflow-hidden rounded-xl border bg-white transition ${selected
                                    ? 'border-blue-500 shadow-md shadow-blue-100'
                                    : 'border-slate-200 hover:border-slate-300 hover:shadow-md'
                                    }`}
                                key={room.id}
                            >
                                <div className="px-2.5 pt-2.5">
                                    <p className="mb-2 text-xs font-bold text-slate-900 sm:text-sm">
                                        Room no: {room.id}
                                    </p>
                                    <div className="relative overflow-hidden rounded-md">
                                        <img
                                            src={roomImage}
                                            alt={`${room.title} interior`}
                                            className="h-20 w-full object-cover sm:h-24"
                                        />
                                        <span className="absolute right-1.5 top-1.5 flex items-center gap-0.5 rounded-full bg-emerald-500 px-1.5 py-0.5 text-[9px] font-semibold text-white">
                                            <Check size={11} /> Available
                                        </span>
                                    </div>
                                </div>
                                <div className="p-2.5">
                                    <div className="space-y-1.5 text-[10px] text-slate-500 sm:text-xs">
                                        <p className="flex items-center gap-1.5"><Building2 size={12} /> Building 2: {room.floor}</p>
                                        <p className="flex items-center gap-1.5"><Users size={12} /> {room.guests}</p>
                                    </div>
                                    <p className="mt-2">
                                        <span className="text-base font-bold text-orange-500 sm:text-lg">${room.price}.00</span>
                                        <span className="text-[9px] text-slate-400 sm:text-[10px]"> / night</span>
                                    </p>
                                    <div className="mt-2.5 flex items-center justify-between gap-1.5 border-t border-slate-100 pt-2.5">
                                        <button className="flex min-w-0 items-center gap-1 text-[9px] text-slate-500 hover:text-slate-900 sm:text-[10px]">
                                            <CalendarDays size={11} />
                                            <span className="truncate">View details</span>
                                            <ChevronDown size={10} />
                                        </button>
                                        <button
                                            className={`shrink-0 rounded-md px-2 py-1.5 text-[9px] font-semibold transition sm:text-[10px] ${selected ? 'bg-blue-500 text-white' : 'bg-blue-500 text-white hover:bg-blue-600'
                                                }`}
                                            onClick={() => onToggleRoom(room.id)}
                                        >
                                            {selected ? 'Selected' : 'Select dates'}
                                        </button>
                                    </div>
                                </div>
                            </article>
                        )
                    })}
                </div>
            </div>

            <aside className="h-fit rounded-xl border border-slate-200 bg-slate-50 p-5 lg:sticky lg:top-6">
                <p className="font-bold">Selected rooms</p>
                <div className="mt-4 space-y-3">
                    {selectedRooms.map((room) => (
                        <div className="flex items-center justify-between rounded-lg bg-white p-3 shadow-sm" key={room.id}>
                            <div>
                                <p className="text-sm font-semibold">{room.title} {room.id}</p>
                                <p className="mt-1 text-xs text-orange-600">12th March · ${room.price}</p>
                            </div>
                            <button onClick={() => onToggleRoom(room.id)} aria-label={`Remove room ${room.id}`} className="p-1 text-slate-400 hover:text-red-500">
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))}
                </div>
                <div className="mt-5 space-y-2 border-t border-slate-200 pt-4 text-sm">
                    <p className="flex justify-between text-slate-500"><span>Subtotal</span><span>${subtotal}.00</span></p>
                    <p className="flex justify-between text-slate-500"><span>Advance received</span><span>-$50.00</span></p>
                    <p className="flex justify-between pt-2 text-base font-bold"><span>Total amount</span><span className="text-orange-600">${Math.max(0, subtotal - 50)}.00</span></p>
                </div>
                <button className="primary-button mt-6 w-full" onClick={onNext} disabled={!selectedRooms.length}>
                    Continue <ArrowRight size={17} />
                </button>
            </aside>
        </section>
    )
}

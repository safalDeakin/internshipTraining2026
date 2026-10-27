import { X } from 'lucide-react'

export function ReservationHeader({ onClose }: { onClose: () => void }) {
    return (
        <header className="flex justify-between ">
            <div className='flex items-center gap-3'>
                <button
                    className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-950"
                    onClick={onClose}
                    aria-label="Close reservation"
                >
                    <X size={20} />
                </button>
                <div>
                    <p className="text-lg font-bold sm:text-xl">Make a reservation</p>
                </div>
            </div>

            <div>
                <button >
                    <a href="" target='_blank'>
                        Print Reservation Form
                    </a>
                </button>
            </div>
        </header>
    )
}

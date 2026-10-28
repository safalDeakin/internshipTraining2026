import { ReservationHeader } from './components/ReservationHeader'
import { ReservationStepper } from './components/ReservationStepper'
import { RoomSelection } from './components/RoomSelection'
import { GuestInformation } from './components/GuestInformation'
import { PaymentInformation } from './components/PaymentInformation'
import { useReservationFlow } from '../../hooks/hotelReservation/useReservationFlow'
import "./styles/index.css"

export default function HotelReservation() {
    const flow = useReservationFlow()

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-6 text-slate-950 sm:px-8 sm:py-10 lg:px-14">
            <div className="mx-auto max-w-7xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="p-5 sm:p-8 lg:p-10">
                    <ReservationHeader onClose={flow.reset} />
                    <ReservationStepper currentStep={flow.currentStep} onStepChange={flow.goToStep} />

                    {flow.screen === 'rooms' && (
                        <RoomSelection
                            selectedRoomIds={flow.selectedRoomIds}
                            onToggleRoom={flow.toggleRoom}
                            onNext={flow.next}
                        />
                    )}
                    {flow.screen === 'guest' && (
                        <GuestInformation
                            data={flow.guestDetails}
                            onChange={flow.updateGuestDetails}
                            onBack={flow.back}
                            onNext={flow.next}
                        />
                    )}
                    {flow.screen === 'payment' && (
                        <PaymentInformation
                            data={flow.paymentDetails}
                            onChange={flow.updatePaymentDetails}
                            onBack={flow.back}
                            onSubmit={flow.complete}
                        />
                    )}
                    {flow.screen === 'complete' && (
                        <section className="mx-auto max-w-xl py-24 text-center">
                            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">
                                Reservation confirmed
                            </p>
                            <p className="mt-3 text-2xl font-bold sm:text-3xl">Your stay is booked.</p>
                            <p className="mt-3 text-sm text-slate-500 sm:text-base">
                                A confirmation has been prepared.
                            </p>
                            <button className="primary-button mt-8" onClick={flow.reset}>
                                Make another reservation
                            </button>
                        </section>
                    )}
                </div>
            </div>
        </main>
    )
}

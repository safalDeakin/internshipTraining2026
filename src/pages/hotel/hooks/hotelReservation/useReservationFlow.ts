import { useState } from 'react'

type Screen = 'rooms' | 'guest' | 'payment' | 'complete'

export type GuestDetails = {
    guestType: 'individual' | 'company'
    firstName: string
    lastName: string
    phone: string
    email: string
    address: string
    idType: string
    idNumber: string
}

export type PaymentDetails = {
    advancePayment: 'yes' | 'no'
    paymentMethod: string
    amount: string
    cardType: string
    cardHolderName: string
    cardNumber: string
    bankName: string
}

export function useReservationFlow() {
    const [screen, setScreen] = useState<Screen>('rooms')
    const [selectedRoomIds, setSelectedRoomIds] = useState<number[]>([104, 106])
    const [guestDetails, setGuestDetails] = useState<GuestDetails>({
        guestType: 'individual',
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        address: '',
        idType: '',
        idNumber: '',
    })
    const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
        advancePayment: 'yes',
        paymentMethod: 'card',
        amount: '50.00',
        cardType: '',
        cardHolderName: '',
        cardNumber: '',
        bankName: '',
    })

    const screenSteps: Record<Screen, number> = { rooms: 1, guest: 3, payment: 5, complete: 5 }
    const nextScreen: Record<Exclude<Screen, 'complete'>, Screen> = {
        rooms: 'guest',
        guest: 'payment',
        payment: 'complete',
    }
    const previousScreen: Partial<Record<Screen, Screen>> = {
        guest: 'rooms',
        payment: 'guest',
        complete: 'payment',
    }

    return {
        screen,
        selectedRoomIds,
        guestDetails,
        paymentDetails,
        currentStep: screenSteps[screen],
        toggleRoom: (id: number) =>
            setSelectedRoomIds((current) =>
                current.includes(id) ? current.filter((roomId) => roomId !== id) : [...current, id],
            ),
        next: () => screen !== 'complete' && setScreen(nextScreen[screen]),
        back: () => setScreen(previousScreen[screen] ?? 'rooms'),
        updateGuestDetails: (field: keyof GuestDetails, value: string) =>
            setGuestDetails((current) => ({ ...current, [field]: value })),
        updatePaymentDetails: (field: keyof PaymentDetails, value: string) =>
            setPaymentDetails((current) => ({ ...current, [field]: value })),
        complete: () => {
            console.log('Reservation submitted:', {
                selectedRoomIds,
                guest: guestDetails,
                payment: paymentDetails,
                submittedAt: new Date().toISOString(),
            })
            setScreen('complete')
        },
        reset: () => setScreen('rooms'),
        goToStep: (step: number) => setScreen(step <= 2 ? 'rooms' : step <= 4 ? 'guest' : 'payment'),
    }
}

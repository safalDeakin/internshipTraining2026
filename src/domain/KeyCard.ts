export type DetailRow = {
    label: string
    value: string
}

export type KeyCard = {
    id: string
    cardNumber: string
    cardType: string
    technology: string
    status: string
    dateRange: string
    issuedDate: string
    duration: string
    currentHolder: string
    currentRoom: string
    reservationNo: string
    holderInformation: DetailRow[]
    returnInformation: DetailRow[]
}

export type CardAction = 'issue' | 'lost' | 'extend' | 'return' | 'reissue'

export type CardFormType = CardAction | 'register'

export type PackageStat = {
    label: string
    value: string
}

export type DetailField = {
    label: string
    value: string
}

export type MenuItem = {
    mealType: string
    included: string
    serviceType: string
}

export type AddOn = {
    service: string
    details: string
}

export type HotelPackage = {
    id: string
    name: string
    code: string
    category: string
    packageType: string
    description: string
    stats: PackageStat[]
    bookingDetails: DetailField[]
    roomDetails: DetailField[]
    roomCharges: DetailField[]
    menu: MenuItem[]
    addOns: AddOn[]
}

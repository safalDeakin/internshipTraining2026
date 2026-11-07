export const roomImage =
    'https://images.unsplash.com/photo-1630660664869-c9d3cc676880?auto=format&fit=crop&w=900&q=85'

export const rooms = [
    { id: 104, title: 'Family Room', floor: '2nd Floor', guests: '2–4 persons', price: 132 },
    { id: 105, title: 'Deluxe Room', floor: '1st Floor', guests: '1–2 persons', price: 118 },
    { id: 106, title: 'Family Room', floor: '2nd Floor', guests: '2–4 persons', price: 132 },
    { id: 107, title: 'Studio Room', floor: '2nd Floor', guests: '1–2 persons', price: 132 },
    { id: 108, title: 'Family Room', floor: '3rd Floor', guests: '2–4 persons', price: 144 },
] as const

export const steps = ['Select room', 'Dates', 'Guest details', 'Review', 'Payment']

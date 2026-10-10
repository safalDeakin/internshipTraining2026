import { useAppContext } from '../../pages/allReservation/context/AppContext';
import { useReservationState } from './useReservationState';

export function useReservationActions() {
    const { repo } = useAppContext();
    const { selectedReservation } = useReservationState();
    const r = selectedReservation;

    const handleRequestRoomService = () => {
        const service = prompt('Enter room service request (e.g. Extra Towels, Breakfast):');
        if (service?.trim()) {
            repo.addFolioItem(r.id, {
                date: new Date().toLocaleDateString(),
                description: `Room Service: ${service.trim()}`,
                charge: 500,
                credit: 0,
            });
            alert('Room service requested successfully!');
        }
    };

    const handleChangeRoom = () => {
        alert(`Change room for ${r.roomCode} — integration with room management required.`);
    };

    const handleCancelReservation = () => {
        if (r.reservationStatus === 'Cancelled') {
            alert('This reservation is already cancelled.');
            return;
        }
        if (window.confirm(`Cancel reservation ${r.reservationNumber}?`)) {
            repo.cancelReservation(r.id);
        }
    };

    const handleExportCSV = () => {
        const rows = [
            ['Field', 'Value'],
            ['Reservation Number', r.reservationNumber],
            ['Room Code', r.roomCode],
            ['Guest Name', r.guest.name],
            ['Nationality', r.guest.nationality],
            ['Phone', r.guest.phone],
            ['Email', r.guest.email],
            ['Room Number', r.room.number],
            ['Room Type', r.room.type],
            ['Booking Date', r.bookingDate],
            ['Status', r.reservationStatus],
            ['Source', r.source],
            ['Adults', String(r.adults)],
            ['Children', String(r.children)],
            ['Expected Arrival', r.expectedArrival],
            ['Total Amount', String(r.payment.totalAmount)],
            ['Advance Paid', String(r.payment.advancePaid)],
            ['Outstanding Balance', String(r.payment.outstandingBalance)],
        ];
        const csv = rows.map((row) => row.join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `reservation-${r.reservationNumber}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const handlePrintPDF = () => window.print();

    return {
        handleRequestRoomService,
        handleChangeRoom,
        handleCancelReservation,
        handleExportCSV,
        handlePrintPDF,
    };
}

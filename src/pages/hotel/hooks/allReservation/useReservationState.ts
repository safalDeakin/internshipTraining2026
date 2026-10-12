import { useSyncExternalStore } from 'react';
import { useAllReservationContext } from '../../pages/allReservation/context/AllReservationContext';

export function useReservationState() {
  const { reservationState } = useAllReservationContext();

  const snapshot = useSyncExternalStore(
    reservationState.subscribe,
    reservationState.getSnapshot
  );

  return {
    ...snapshot,
    setSearch: (s: string) => reservationState.setSearch(s),
    selectReservation: (id: string) => reservationState.selectReservation(id),
  };
}

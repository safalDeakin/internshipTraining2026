import { useSyncExternalStore } from 'react';
import { useAppContext } from '../context/AppContext';

export function useReservationState() {
  const { reservationState } = useAppContext();

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

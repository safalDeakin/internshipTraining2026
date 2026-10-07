import { Repo } from "./Repo";

import { LocalReservationRepo } from "./local/LocalReservationRepo";
import { LocalRoomRepo } from "./local/LocalRoomRepo";
import { LocalGuestRepo } from "./local/LocalGuestRepo";
import { LocalFolioRepo } from "./local/LocalFolioRepo";
import { LocalPaymentRepo } from "./local/LocalPaymentRepo";
import { LocalProductRepo } from "./local/LocalProductRepo";
import { LocalKitchenOrderRepo } from "./local/LocalKitchenOrderRepo";
import { LocalInventoryRepo } from "./local/LocalInventoryRepo";
import { LocalCalendarRepo } from "./local/LocalCalendarRepo";

export function createLocalRepo() {
    return new Repo({
        reservations: new LocalReservationRepo(),
        rooms: new LocalRoomRepo(),
        guests: new LocalGuestRepo(),
        folios: new LocalFolioRepo(),
        payments: new LocalPaymentRepo(),
        products: new LocalProductRepo(),
        kitchenOrders: new LocalKitchenOrderRepo(),
        inventory: new LocalInventoryRepo(),
        calendar: new LocalCalendarRepo(),
    });
}
import { Repository } from "../utils/repo/Repository";
import { type Guest } from "../domain/GuestModel";
import QueryService from "./service/QueryService";
import CommandService from "./service/CommandService";

//Hotel-Package
import type { HotelPackage } from "../domain/hotel-package";
import { packages } from "../pages/hotel-packages/data/packages";


//HouseKeeping
import type { Room } from "../domain/houseKeeping";
import { rooms } from "../pages/houseKeeping/data/data"




const repo = new Repository<Guest, string>({
    sourceType: 'InMemoryLocal',
    domain: 'Reservation',
    tenantId: 'MySpace1234',
    getId: (entity: Guest) => entity.id,
    initialData: [
        {
            id: "12345",
            name: "New Name",
            email: "new EMail"
        }
        ,
        {
            id: "09876",
            name: "Hello 09876 Name",
            email: "09876 is your EMail"
        }
    ],
    baseUrl: "asas",
    eventsUrl: "events"
})

export const guestQueryService = new QueryService<Guest, string>(repo);
export const guestCmdService = new CommandService<Guest, string>(repo);


//This is for HotelPackage
const PackageRepo = new Repository<HotelPackage, string>({
    sourceType: 'InMemoryLocal',
    domain: 'Package',
    tenantId: 'MySpace1234',
    getId: (entity: HotelPackage) => entity.id,
    initialData: packages,
    baseUrl: "asas",
    eventsUrl: "events"
})

export const packageQueryService = new QueryService<HotelPackage, string>(PackageRepo);
export const packageCmdService = new CommandService<HotelPackage, string>(PackageRepo);



//This is for HouseKeeping and Maintenance 
const HouseKeeping = new Repository<Room, string>({
    sourceType: 'InMemoryLocal',
    domain: 'HandM',
    tenantId: 'MySpace1234',
    getId: (entity: Room) => String(entity.id),
    initialData: rooms,
    baseUrl: "asas",
    eventsUrl: "events"
})

export const HouseKeepingQueryService = new QueryService<Room, string>(HouseKeeping);
export const HouseKeepingCmdService = new CommandService<Room, string>(HouseKeeping);

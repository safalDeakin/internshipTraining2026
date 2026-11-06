import { Repository } from "../lib/utils/repo/Repository";
import { type Guest } from "../domain/GuestModel";
import QueryService from "./service/QueryService";
import CommandService from "./service/CommandService";

//Hotel-Package
import type { HotelPackage } from "../domain/hotel-package";
import { packages } from "../pages/hotel-packages/data/packages";

//HouseKeeping
import type { Room } from "../domain/houseKeeping";
import { rooms } from "../pages/houseKeeping/data/data";

//LostAndFound
import { initialLostAndFoundItems } from "../pages/lost-found/data/data";
import type { Item } from "../domain/lostfound";
import {
  initialOfferData,
  type Offer,
} from "../pages/restaurant/dropdown/offer/data/initialOfferData";


//Night Audit
import type { NightAuditData } from "../domain/nightAudit";
import { nightAuditData } from "../pages/hotel/pages/nightAudit/data/nightAuditData";

//KeyCard
import type { KeyCard } from "../domain/KeyCard";
import { initialKeyCards } from "../pages/key-card/data/Keycard.data";
import type { POSOverview } from "../domain/pos.overview";
import { initialPOSOverview } from "../pages/pos-overviewPage/data/pos.overview.data";



import {
  initialPricelistData,
  type PricelistType,
} from "../pages/restaurant/dropdown/Pricelist/data/initialPricelistData";
import {
  initialProductData,
  type ProductGroup,
} from "../pages/restaurant/dropdown/products/data/initialProductData";

const repo = new Repository<Guest, string>({
  sourceType: "InMemoryLocal",
  domain: "Reservation",
  tenantId: "MySpace1234",
  getId: (entity: Guest) => entity.id,
  initialData: [
    {
      id: "12345",
      name: "New Name",
      email: "new EMail",
    },
    {
      id: "09876",
      name: "Hello 09876 Name",
      email: "09876 is your EMail",
    },
  ],
  baseUrl: "asas",
  eventsUrl: "events",
});

export const guestQueryService = new QueryService<Guest, string>(repo);
export const guestCmdService = new CommandService<Guest, string>(repo);

//This is for HotelPackage
const PackageRepo = new Repository<HotelPackage, string>({
  sourceType: "InMemoryLocal",
  domain: "Package",
  tenantId: "MySpace1234",
  getId: (entity: HotelPackage) => entity.id,
  initialData: packages,
  baseUrl: "asas",
  eventsUrl: "events",
});

export const packageQueryService = new QueryService<HotelPackage, string>(
  PackageRepo,
);
export const packageCmdService = new CommandService<HotelPackage, string>(
  PackageRepo,
);

//This is for HouseKeeping and Maintenance
const HouseKeeping = new Repository<Room, string>({
  sourceType: "InMemoryLocal",
  domain: "HandM",
  tenantId: "MySpace1234",
  getId: (entity: Room) => String(entity.id),
  initialData: rooms,
  baseUrl: "asas",
  eventsUrl: "events",
});

export const HouseKeepingQueryService = new QueryService<Room, string>(
  HouseKeeping,
);
export const HouseKeepingCmdService = new CommandService<Room, string>(
  HouseKeeping,
);

//This is for Lost and Found
const LostandFound = new Repository<Item, string>({
  sourceType: "InMemoryLocal",
  domain: "LostandFound",
  tenantId: "MySpace1234",
  getId: (entity: Item) => String(entity.id),
  initialData: initialLostAndFoundItems,
  baseUrl: "asas",
  eventsUrl: "events",
});

export const LostandFoundQueryService = new QueryService<Item, string>(
  LostandFound,
);
export const LostandFoundCmdService = new CommandService<Item, string>(
  LostandFound,
);


//This is for Night audit
const NightAudit = new Repository<NightAuditData, string>({
  sourceType: 'InMemoryLocal',
  domain: 'LostandFound',
  tenantId: 'MySpace1234',
  getId: (entity: NightAuditData) => String(entity.id),
  initialData: [nightAuditData],
  baseUrl: "asas",
  eventsUrl: "events"
})

export const nightAuditQueryService = new QueryService<NightAuditData, string>(NightAudit);
export const nightAuditCmdService = new CommandService<NightAuditData, string>(NightAudit);


//This is for KeyCard
const KeyCardRepo = new Repository<KeyCard, string>({
  sourceType: 'InMemoryLocal',
  domain: 'KeyCard',
  tenantId: 'MySpace1234',
  getId: (entity: KeyCard) => String(entity.id),
  initialData: initialKeyCards,
  baseUrl: "asas",
  eventsUrl: "events"
})

export const keyCardQueryService = new QueryService<KeyCard, string>(KeyCardRepo);
export const keyCardCmdService = new CommandService<KeyCard, string>(KeyCardRepo);



//This is for POS Overview
const POSOverviewRepo = new Repository<POSOverview, string>({
  sourceType: 'InMemoryLocal',
  domain: 'POSOverview',
  tenantId: 'MySpace1234',
  getId: (entity: POSOverview) => String(entity.id),
  initialData: initialPOSOverview,
  baseUrl: "asas",
  eventsUrl: "events"
})

export const posOverviewQueryService = new QueryService<POSOverview, string>(POSOverviewRepo);
export const posOverviewCmdService = new CommandService<POSOverview, string>(POSOverviewRepo);
// Offer Repository -----------1st---------
const OfferRepo = new Repository<Offer, string>({
  sourceType: "InMemoryLocal",
  domain: "Offer",
  tenantId: "MySpace1234",
  getId: (entity: Offer) => String(entity.id),
  initialData: initialOfferData,
  baseUrl: "asas",
  eventsUrl: "events",
});

export const OfferQueryService = new QueryService<Offer, string>(OfferRepo);
export const OfferCmdService = new CommandService<Offer, string>(OfferRepo);

// Products
const ProductRepo = new Repository<ProductGroup, string>({
  sourceType: "InMemoryLocal",
  domain: "Product",
  tenantId: "MySpace1234",
  getId: (entity: ProductGroup) => entity.id,
  initialData: initialProductData,
  baseUrl: "asas",
  eventsUrl: "events",
});

export const ProductQueryService = new QueryService<ProductGroup, string>(
  ProductRepo,
);

export const ProductCmdService = new CommandService<ProductGroup, string>(
  ProductRepo,
);

// Pricelist Repository
const PricelistRepo = new Repository<Pricelist, string>({
  sourceType: "InMemoryLocal",
  domain: "Product",
  tenantId: "MySpace1234",
  getId: (entity: Pricelist) => entity.id,
  initialData: initialPricelistData,
  baseUrl: "asas",
  eventsUrl: "events",
});

// Query Service
export const PricelistQueryService = new QueryService<Pricelist, string>(
  PricelistRepo,
);

// Command Service
export const PricelistCmdService = new CommandService<Pricelist, string>(
  PricelistRepo,
);

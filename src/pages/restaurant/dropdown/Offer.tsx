
//author:shrajja
import { Outlet } from "react-router-dom";
import ListHeader from "../../../XXcomponents/ListHeader";

const Offer = () => {
  return (
    <div>
      <ListHeader />
      {/* <ListHeroSection /> */}

      <Outlet />
    </div>
  );
};

export default Offer;




// //author:shrajja
// import { Outlet } from "react-router-dom";
// <<<<<<< HEAD:src/pages/restaurant/dropdown/Offer.tsx
// import ListHeader from "../../../XXcomponents/ListHeader";
// =======
// import ListView from "../../../component/ListView/Listview";
// import { useState } from "react";
// import { initialData } from "../../../data/data";
// >>>>>>> dev:src/pages/restaurant/pages/Offer.tsx

// const Offer = () => {
//   const [search, setSearch] = useState("")
//   const [selectedOfferId, setSelectedOfferId] = useState<string | null>(null)

//   const filteredOffers = initialData.filter((offer) =>
//     offer.name.toLowerCase().includes(search.toLocaleLowerCase())
//   )

//   const handleOfferSelect = (offer: any) => {
//     setSelectedOfferId(offer.id)
//   }

//   return (
//     <div>
//       <ListView
//         title="Offers"
//         items={filteredOffers}
//         getKey={(offer) => offer.id}
//         selectedId={selectedOfferId}
//         onSelect={handleOfferSelect}
//         onAdd={() => {
//           console.log("Add offer");
//         }}
//         renderItem={(offer) => (
//           <div className="flex flex-col">
//             <span className="text-[12px] font-medium text-[#29445f]">
//               {offer.name}
//             </span>
//           </div>
//         )}
//         searchable
//         search={search}
//         onSearchChange={setSearch}
//         searchPlaceholder="Search offers..."
//       />

//       <Outlet />
//     </div>
//   );
// };

// export default Offer;

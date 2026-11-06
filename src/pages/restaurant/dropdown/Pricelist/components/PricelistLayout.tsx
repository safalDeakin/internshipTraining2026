// author: shrajja

import PricelistDetails from "./PricelistDetails";
import usePricelist from "../context/usePricelist";
import MasterDetailView from "../../../../../lib/component/MasterDetailView/MasterDetailView";
import type { PricelistType } from "../../types/DropdownTypes";

const Pricelist = () => {
  //data from context
  const { filteredPricelists, loading, search, setSearch } = usePricelist();

  if (loading) {
    return (
      <div className="p-5 text-sm text-gray-500">Loading pricelists...</div>
    );
  }

  return (
    <MasterDetailView<PricelistType, string>
      title="Pricelist"
      items={filteredPricelists}
      searchQuery={search}
      onSearchChange={setSearch}
      //Get the ID of each pricelist
      getId={(item) => item.id}
      //Display each pricelist in the list
      listItemBuilder={(item) => <span>{item.name}</span>}
      //details of that pricelist appear on the right side.
      detailContentBuilder={(selectedId) => {
        const selectedPricelist = filteredPricelists.find(
          (item) => item.id === selectedId,
        );

        if (!selectedPricelist) {
          return (
            <p className="p-5 text-sm text-gray-500">Pricelist not found.</p>
          );
        }

        return <PricelistDetails pricelist={selectedPricelist} />;
      }}
      headerChildren={null}
    />
  );
};

export default Pricelist;

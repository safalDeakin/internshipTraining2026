// author: shrajja

import "../../../../../component/table/styles/tableConent.css";
import PricelistDetails from "./PricelistDetails";
import usePricelist from "../context/usePricelist";
import type { Pricelist as PricelistType } from "../data/initialPricelistData";
import MasterDetailView from "../../../../../component/MasterDetailView/MasterDetailView";

const Pricelist = () => {
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
      getId={(item) => item.id}
      listItemBuilder={(item) => <span>{item.name}</span>}
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

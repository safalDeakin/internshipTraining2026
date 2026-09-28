import Footer from "./components/Footer/Footer";
import MsTable from "./components/MsTable";
import SearchBar from "./components/Search/SearchBar";

import ItemsActions from "./components/Actions/ItemsActions";
import { useItemsTable } from "./hooks/useItemTables";
import { getItemColumns } from "./columns/ItemColumns";

import "../styles/tableConent.css";

const ItemsPage = () => {
    const {
        data,

        selectedItems,
        changedRowIds,
        newItemIds,

        setSearch,

        toggleItem,
        handleChange,
        handleAddNewItem,

        updatePrice,
        toggleExclude,
    } = useItemsTable();

    const columns = getItemColumns({
        selectedItems,
        newItemIds,
        toggleItem,
        updatePrice,
        toggleExclude,
    });

    return (
        <>
            <div className="p-15">
                <div className="mb-3">

                    <ItemsActions
                        onChange={() => handleChange(2)}
                        onAddItem={handleAddNewItem}
                    />
                </div>
                <div className="mb-3">


                    <SearchBar
                        onChange={setSearch}
                    />
                </div>

                <MsTable
                    data={data}
                    columns={columns}
                    selectedItems={selectedItems}
                    changedRowIds={changedRowIds}
                />

                <Footer />
            </div>
        </>
    );
};

export default ItemsPage;
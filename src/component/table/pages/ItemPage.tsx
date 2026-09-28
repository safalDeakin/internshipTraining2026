import { useState } from "react";
import Footer from "../components/Footer";
import MsTable from "../components/MsTable";
import SearchBar from "../components/SearchBar";
import { useRepo } from "../hooks/useRepo";
import "../styles/tableConent.css"

const ItemsPage = () => {
    const [changedRowIds, setChangedRowIds] = useState<number[]>([]);
    const [selectedItems, setSelectedItems] = useState<number[]>([1, 2]);
    const [newItemIds, setNewItemIds] = useState<number[]>([]);

    const {
        data,
        setSearch,
        addNewItem,
        updatePrice,
        updateVariant,
        toggleExclude,
    } = useRepo();


    const columns = [
        {
            key: "name",
            label: "Item name",
            idealWidth: 150,
            minWidth: 80,
            priority: 1,
            searchable: true,
            render: (item: any) => (
                <div className="item-name" >
                    {
                        newItemIds.includes(item.id) && (
                            <span className="new-icon">
                                NEW
                            </span>
                        )}
                    <input
                        type="checkbox"
                        className="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => toggleItem(item.id)}
                    />

                    < span > {item.name} </span>
                </div>
            ),
        },
        {
            key: "varient",
            label: "Varient",
            idealWidth: 250,
            minWidth: 100,
            priority: 3,
            searchable: true,
        },
        {
            key: "itemcode",
            label: "Item Code",
            idealWidth: 100,
            minWidth: 70,
            priority: 5,
            searchable: false,
        },
        {
            key: "type",
            label: "Type",
            idealWidth: 120,
            minWidth: 80,
            priority: 4,
            searchable: true,
        },
        {
            key: "price",
            label: "Price",
            idealWidth: 100,
            minWidth: 70,
            priority: 2,
            searchable: true,
            render: (item: any) => (
                <div className="price-field" >
                    <span>Rs.</span>

                    < input
                        className="price-input"
                        type="number"
                        value={item.price}
                        onChange={(e) =>
                            updatePrice(
                                item.id,
                                Number(e.target.value)
                            )
                        }
                    />
                </div>
            ),
        },
        {
            key: "description",
            label: "Description",
            idealWidth: 150,
            minWidth: 90,
            priority: 6,
            searchable: true,
            render: (item: any) => {
                const words = item.description.trim().split(/\s+/);

                if (words.length <= 15) {
                    return item.description;
                }

                return (
                    <div className="description-cell" >
                        <span>
                            {words.slice(0, 3).join(" ")}...
                        </span>

                        < span className="info-wrapper" >
                            <span className="info-icon" >
                                i
                            </span>

                            < span className="description-tooltip" >
                                {item.description}
                            </span>
                        </span>
                    </div>
                );
            }
        },
        {
            key: "exclude",
            label: "Exclude",
            idealWidth: 150,
            minWidth: 70,
            priority: 1,
            searchable: false,
            render: (item: any) => (
                <input
                    type="checkbox"
                    className="exclude-checkbox"
                    checked={item.exclude}
                    onChange={() =>
                        toggleExclude(item.id)
                    }
                />

            ),
        },
    ];



    const handleChange = (id: number) => {

        updateVariant(id, "Large");

        setChangedRowIds((prevIds) =>
            prevIds.includes(id)
                ? prevIds
                : [...prevIds, id]
        );

        setTimeout(() => {
            setChangedRowIds((prevIds) =>
                prevIds.filter(
                    (rowId) => rowId !== id
                )
            );
        }, 3000);
    };

    const toggleItem = (id: number) => {
        if (selectedItems.includes(id)) {
            setSelectedItems(selectedItems.filter(
                itemId => itemId !== id
            ))
        } else {
            setSelectedItems(
                [...selectedItems, id]
            )
        }
    }


    const handleAddNewItem = () => {

        const newId = addNewItem();

        setNewItemIds((prev: any) => [
            ...prev,
            newId
        ]);

        setTimeout(() => {
            setNewItemIds((prev: any) =>
                prev.filter(
                    (id: any) => id !== newId
                )
            );
        }, 5000);
    };


    return (
        <>

            <button className="btn-edit"
                onClick={() => handleChange(2)}
            >
                Change
            </button>

            {/* <button className="btn-edit" onClick={() => addNewItem()}>
                Insert from Top
            </button>

            <button className="btn-edit" onClick={() => addNewItem()}>
                Insert from Bottom
            </button> */}

            <button className="btn-edit" onClick={handleAddNewItem}>
                Insert Item
            </button>

            <SearchBar onChange={(value: any) => setSearch(value)} />
            {/* <SearchBar>

            </SearchBar> */}


            <MsTable
                data={data}
                columns={columns}
                selectedItems={selectedItems}
                newItemIds={newItemIds}
                changedRowIds={changedRowIds}
                // showSearchBar={true}
                // searchType={searchType}
                // onSearchTypeChange={(type: string) => repo.searchByType(type)}
                onChange={(value: string) => setSearch(value)}
            />
            <Footer />
        </>
    );
};

export default ItemsPage
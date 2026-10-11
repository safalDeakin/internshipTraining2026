import type { TableColumn } from "../types/types";
import type { Item } from "../types/Itemtypes";

interface ItemColumnsProps {
    selectedItems: number[];
    newItemIds: number[];
    toggleItem: (id: number) => void;
    updatePrice: (id: number, price: number) => void;
    toggleExclude: (id: number) => void;
}

export const getItemColumns = ({
    selectedItems,
    newItemIds,
    toggleItem,
    updatePrice,
    toggleExclude,
}: ItemColumnsProps): TableColumn<Item>[] => {
    return [
        {
            key: "name",
            label: "Item name",
            idealWidth: 150,
            minWidth: 80,
            priority: 1,
            searchable: true,

            render: (item) => (
                <div className="item-name">
                    {newItemIds.includes(item.id) && (
                        <span className="new-icon">
                            NEW
                        </span>
                    )}

                    <input
                        type="checkbox"
                        className="checkbox"
                        checked={selectedItems.includes(
                            item.id
                        )}
                        onChange={() =>
                            toggleItem(item.id)
                        }
                    />

                    <span>{item.name}</span>
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

            render: (item) => (
                <div className="price-field">
                    <span>Rs.</span>

                    <input
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

            render: (item) => {
                const words =
                    item.description
                        .trim()
                        .split(/\s+/);

                if (words.length <= 15) {
                    return item.description;
                }

                return (
                    <div className="description-cell">
                        <span>
                            {words
                                .slice(0, 3)
                                .join(" ")}
                            ...
                        </span>

                        <span className="info-wrapper">
                            <span className="info-icon">
                                i
                            </span>

                            <span className="description-tooltip">
                                {item.description}
                            </span>
                        </span>
                    </div>
                );
            },
        },

        {
            key: "exclude",
            label: "Exclude",
            idealWidth: 150,
            minWidth: 70,
            priority: 1,
            searchable: false,

            render: (item) => (
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
};
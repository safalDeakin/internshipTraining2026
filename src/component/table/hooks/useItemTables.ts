import { useState } from "react";
import { useRepo } from "./useRepo";

export const useItemsTable = () => {
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

    const toggleItem = (id: number) => {
        setSelectedItems((prev) =>
            prev.includes(id)
                ? prev.filter(
                    itemId => itemId !== id
                )
                : [...prev, id]
        );
    };

    const handleChange = (id: number) => {
        updateVariant(id, "Large");

        setChangedRowIds((prev) =>
            prev.includes(id)
                ? prev
                : [...prev, id]
        );

        setTimeout(() => {
            setChangedRowIds((prev) =>
                prev.filter(
                    rowId => rowId !== id
                )
            );
        }, 3000);
    };

    const handleAddNewItem = () => {
        const newId = addNewItem();

        setNewItemIds((prev) => [
            ...prev,
            newId,
        ]);

        setTimeout(() => {
            setNewItemIds((prev) =>
                prev.filter(
                    id => id !== newId
                )
            );
        }, 5000);
    };

    return {
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
    };
};
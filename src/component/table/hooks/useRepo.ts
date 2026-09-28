import { useSyncExternalStore } from "react";
import { stateholder } from "../repo/StateHolder";

export const useRepo = () => {

    const snapshot = useSyncExternalStore(
        stateholder.subscribe.bind(stateholder),
        stateholder.getSnapshot.bind(stateholder)
    );

    return {
        data: snapshot.data,
        searchTerm: snapshot.searchTerm,

        setSearch: stateholder.setSearch.bind(stateholder),
        addNewItem: stateholder.addNewItem.bind(stateholder),
        updatePrice: stateholder.updatePrice.bind(stateholder),
        updateVariant: stateholder.updateVariant.bind(stateholder),
        toggleExclude: stateholder.toggleExclude.bind(stateholder),
    };
};
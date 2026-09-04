import { useSyncExternalStore } from "react";
import { KitchenStateHolder } from "../states/KitchenStateHolder";

export const useKitchenState = (stateHolder: KitchenStateHolder) => {
    const snapshot = useSyncExternalStore(
        stateHolder.subscribe,
        stateHolder.getSnapshot
    );

    return {
        ...snapshot,
        setSearch: stateHolder.setSearch.bind(stateHolder),
        selectOrder: stateHolder.selectOrder.bind(stateHolder),
    };
};


// const {
//     kitchenOrders,
//     search,
//     selectedOrderId,
//     setSearch,
//     selectOrder
// } = useKitchenState(kitchenState);
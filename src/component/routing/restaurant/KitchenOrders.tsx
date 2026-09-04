import { useRepo } from "../../../context/RepoContext";
import { useKitchenState } from "../../../hooks/useKitchenState";

const KitchenOrders = () => {
    const { kitchenState } = useRepo();

    const {
        kitchenOrders,
        search,
        selectedOrderId,
        setSearch,
        selectOrder,
    } = useKitchenState(kitchenState);

    const filteredOrders = kitchenOrders.filter(
        (order) =>
            order.id
                .toLowerCase()
                .includes(search.toLowerCase()) ||
            order.restaurantId
                .toLowerCase()
                .includes(search.toLowerCase()) ||
            order.status
                .toLowerCase()
                .includes(search.toLowerCase())
    );

    return (
        <div className="p-5">

            <div className="flex justify-between items-center mb-5">

                <h1 className="text-2xl font-semibold">
                    Kitchen Orders
                </h1>

                <input
                    type="text"
                    placeholder="Search orders..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    className="border border-gray-200 rounded-md px-3 py-2 outline-none focus:border-blue-400"
                />

            </div>

            <div className="flex flex-col gap-3">

                {filteredOrders.map((order) => {

                    const isSelected =
                        order.id === selectedOrderId;

                    return (
                        <div
                            key={order.id}
                            onClick={() =>
                                selectOrder(order.id)
                            }
                            className={`
                                p-4
                                border
                                rounded-md
                                cursor-pointer
                                transition
                                ${isSelected
                                    ? "border-blue-500 bg-blue-50"
                                    : "border-gray-200 hover:bg-gray-50"
                                }
                            `}
                        >

                            <div className="flex justify-between">

                                <div>
                                    <p className="font-medium">
                                        Order #{order.id}
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        Restaurant:{" "}
                                        {order.restaurantId}
                                    </p>
                                </div>

                                <span className="text-sm">
                                    {order.status}
                                </span>

                            </div>

                        </div>
                    );
                })}

                {filteredOrders.length === 0 && (
                    <p className="text-gray-500">
                        No kitchen orders found.
                    </p>
                )}

            </div>
        </div>
    );
};

export default KitchenOrders;
import { useMemo, useState } from "react";

import {
    productDetails,
    productOptions,
} from "../../pages/roomDetail/data/roomDetailData";

export function useRoomDetail() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedProductId, setSelectedProductId] =
        useState("deluxe");

    const filteredProducts = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();

        if (!query) {
            return productOptions;
        }

        return productOptions.filter((product) =>
            [
                product.name,
                product.subtitle,
                product.detail,
            ].some((value) =>
                value.toLowerCase().includes(query),
            ),
        );
    }, [searchQuery]);

    const selectedProduct =
        productDetails[selectedProductId];

    const data = {
        ...selectedProduct,
        products: filteredProducts,
    };

    return {
        data,
        searchQuery,
        selectedProductId,
        onSearchChange: setSearchQuery,
        onSelectProduct: setSelectedProductId,
    };
}
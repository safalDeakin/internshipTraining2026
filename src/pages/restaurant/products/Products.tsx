// author: shrajja

import { useMemo, useState } from "react";

import Sidebar from "../../../component/ListView/Listview";
import SidebarHeader from "../../../component/ListView/ListViewHeader";
import SidebarList from "../../../component/ListView/ListViewList";
import SearchInput from "../../../component/ListView/SearchInput";
import FnBDetails from "./FnBDetails";
import type { ProductGroup, ProductItem } from "./type";


const sidebarItems = [
  { id: "1", label: "Pizza" },
  { id: "2", label: "Pizzaz" },
];


const productGroups: Record<string, ProductGroup> = {
  "1": {
    id: "1",
    name: "Pizza",
    code: "PZ1212QW",
    status: "Active",

    items: [
      {
        id: "i1",
        name: "Margerita",
        sku: "PZ1212QW",
        description: "Made with Cheese, Pizza Sauce, Oregano, Rosemarry",
        calories: "2840Kcal",
        image: "https://placehold.co/80x80?text=Pizza",
      },
      {
        id: "i2",
        name: "Paperoni",
        sku: "PZ1212QW",
        description: "Made with Cheese, Pizza Sauce, Oregano, Rosemarry",
        calories: "2840Kcal",
        image: "https://placehold.co/80x80?text=Pizza",
      },
    ],

    attributes: [
      ["Small", "Large", "Family"],
      ["Thin Crust", "Thick Crust", "Cheesy"],
    ],

    tags: ["Italian", "Cheesy", "Famous"],
  },
};

const getVariants = (attributes: string[][]) => {
  if (!attributes.length) return [];

  return attributes
    .reduce<
      string[][]
    >((combinations, group) => combinations.flatMap((combination) => group.map((value) => [...combination, value])), [[]])
    .map((combination) => combination.join(" x "));
};

const Products = () => {
  const [selectedId, setSelectedId] = useState("1");
  const [search, setSearch] = useState("");

  const filteredItems = sidebarItems.filter((item) =>
    item.label.toLowerCase().includes(search.toLowerCase()),
  );

  const product = productGroups[selectedId];

  const variants = useMemo(
    () => (product ? getVariants(product.attributes) : []),
    [product],
  );

  return (
    <section className="grid h-full w-full grid-cols-[280px_1fr]">
      {/* Sidebar */}
      <aside className="min-w-0">
        <Sidebar>
          <SidebarHeader title="Products" />

          <SearchInput
            value={search}
            handleChange={setSearch}
            placeholder="Search products..."
            className="mb-3 mt-3"
          />

          <SidebarList
            items={filteredItems}
            selectedId={selectedId}
            getId={(item) => item.id}
            onSelect={(item) => setSelectedId(item.id)}
            renderItem={(item) => <span>{item.label}</span>}
          />
        </Sidebar>
      </aside>

      {/* Product Details */}
      <FnBDetails product={product} variants={variants} ></FnBDetails>
    </section>
  );
};


export default Products;

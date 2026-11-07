import { useState } from "react";
import Sidebar from "../../../lib/component/ListView/Listview";
import SidebarHeader from "../../../lib/component/ListView/ListViewHeader";
import SearchInput from "../../../lib/component/ListView/SearchInput";
import SidebarList from "../../../lib/component/ListView/ListViewList";
import RefundDetails from "./RefundDetails";
import { refundCustomers } from "./constant/RefundData";

const RefundSidebar = () => {
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState("1");

  const filteredCustomers = refundCustomers.filter((customer) =>
    customer.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <section className="grid h-full min-h-0 w-full grid-cols-[280px_minmax(0,1fr)]">
      <aside className="min-h-0 border-r border-gray-200 bg-white">
        <Sidebar>
          <SidebarHeader title="Refund" />

          <SearchInput
            value={search}
            handleChange={setSearch}
            placeholder="Search customers..."
            className="mb-3 mt-3"
          />

          <SidebarList
            items={filteredCustomers}
            selectedId={selectedId}
            getId={(customer) => customer.id}
            onSelect={(customer) => setSelectedId(customer.id)}
            renderItem={(customer) => (
              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium text-[#29445f]">
                  {customer.name}
                </span>
              </div>
            )}
          />
        </Sidebar>
      </aside>
      {/* detaild */}
      <div>
        <RefundDetails />
      </div>
    </section>
  );
};

export default RefundSidebar;

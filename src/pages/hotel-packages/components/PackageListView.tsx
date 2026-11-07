
import { useRepoPackageHook } from "../context/RepoPackageProvider";
import ListView from "../../../component/ListView/Listview";
import { useState } from "react";

export default function PackageListView() {
    const [search, setSearch] = useState("");
    const {
        data,
        selectedPackageId,
        selectPackage,
    } = useRepoPackageHook();


    const filteredData = data.filter((offer) =>
        offer.name
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    return (
        <ListView
            title="Packages"
            items={filteredData}
            getKey={(item) => item.id}
            selectedId={selectedPackageId}
            onSelect={(item) => selectPackage(item.id)}
            onAdd={() => {
                console.log("Add offer");
            }}
            renderItem={(item) => (
                <div className="flex flex-col">
                    <span className="text-[14px] font-medium text-[#29445f]">
                        {item.name}
                    </span>
                </div>
            )}
            searchable
            search={search}
            onSearchChange={setSearch}
            searchPlaceholder="Search offers..."
        />
    );
}
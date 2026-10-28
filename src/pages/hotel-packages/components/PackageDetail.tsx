
import { useEffect, useState } from "react";
import { useRepoPackageHook } from "../context/RepoPackageProvider";

// import PackageHeader from "./PackageHeader";
import PackageStats from "./PackageStats";
import PackageTabs from "./PackageTabs";
import Overview from "./tabs/Overview";
import RoomDetail from "./tabs/RoomDetail";
import MenuDetail from "./tabs/MenuDetail";
import AddOnDetail from "./tabs/AddOnDetail";

const tabs = [
    "Overview",
    "Room Detail",
    "Menu Detail",
    "Service & Add On",
];

export function PackageDetail() {
    const { selectedPackage } = useRepoPackageHook();
    const [activeTab, setActiveTab] = useState("Overview");

    useEffect(() => {
        setActiveTab("Overview");
    }, [selectedPackage?.id]);

    if (!selectedPackage) {
        return (
            <article className="flex min-h-64 items-center justify-center bg-white p-6">
                <p className="text-sm text-gray-500">
                    No package selected or no packages available.
                </p>
            </article>
        );
    }

    return (
        <article className="min-w-0 bg-white mt-4">
            {/* <PackageHeader packageName={selectedPackage.name} /> */}

            <PackageStats stats={selectedPackage.stats} />

            <PackageTabs
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />

            <div className="p-4 sm:p-6">
                {activeTab === "Overview" && <Overview />}

                {activeTab === "Room Detail" && <RoomDetail />}

                {activeTab === "Menu Detail" && <MenuDetail />}

                {activeTab === "Service & Add On" && <AddOnDetail />}
            </div>
        </article>
    );
}

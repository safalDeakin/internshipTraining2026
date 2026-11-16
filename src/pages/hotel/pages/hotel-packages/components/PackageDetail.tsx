import { useEffect, useState } from "react";
import { useRepoPackageHook } from "../context/RepoPackageProvider";

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

type PackageDetailProps = {
    packageId: string | null;
};

export function PackageDetail({
    packageId,
}: PackageDetailProps) {
    const { data } = useRepoPackageHook();

    const selectedPackage = data.find(
        (pkg) => pkg.id === packageId
    );

    const [activeTab, setActiveTab] = useState("Overview");

    useEffect(() => {
        setActiveTab("Overview");
    }, [packageId]);

    if (!selectedPackage) {
        return (
            <article className="flex min-h-64 items-center justify-center bg-white p-6">
                <p className="text-sm text-gray-500">
                    No package selected or package not found.
                </p>
            </article>
        );
    }

    return (
        <article className="mt-4 min-w-0 bg-white">
            <PackageStats stats={selectedPackage.stats} />

            <PackageTabs
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />

            <div className="p-4 sm:p-6">
                {activeTab === "Overview" && (
                    <Overview packageData={selectedPackage} />
                )}

                {activeTab === "Room Detail" && (
                    <RoomDetail packageData={selectedPackage} />
                )}

                {activeTab === "Menu Detail" && (
                    <MenuDetail packageData={selectedPackage} />
                )}

                {activeTab === "Service & Add On" && (
                    <AddOnDetail packageData={selectedPackage} />
                )}
            </div>
        </article>
    );
}
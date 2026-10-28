
interface PackageTabsProps {
    tabs: string[];
    activeTab: string;
    onTabChange: (tab: string) => void;
}

export default function PackageTabs({
    tabs,
    activeTab,
    onTabChange,
}: PackageTabsProps) {
    return (
        <div className="overflow-x-auto border-b border-[#dededb] bg-[#f7f7f5] px-4 sm:px-6">
            <div className="flex min-w-max gap-1">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        type="button"
                        onClick={() => onTabChange(tab)}
                        className={`border-b-2 px-3 py-2.5 text-[14px] transition-colors ${
                            activeTab === tab
                                ? "border-[#292927] font-semibold text-[#292927]"
                                : "border-transparent text-[#777773] hover:text-[#292927]"
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>
        </div>
    );
}

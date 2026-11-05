import { useState } from "react";

export type TabsProps = {
    tabs: { label: string, content: React.ComponentType }[]
}

export default function TabView({ tabs }: TabsProps) {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const ActiveComponent = tabs[currentIndex]?.content

    return (
        <div className="flex flex-col flex-1 min-h-0">
            <div className="border-b border-gray-200 bg-white px-4 shrink-0">
                <div className="flex">
                    {tabs.map((tab, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`px-4 py-2.5 text-xs font-medium border-b-2 transition-colors -mb-px ${currentIndex === index
                                ? 'border-blue-500 text-blue-700 bg-blue-50 rounded-t'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto px-2">
                {/* <ActiveComponent /> */}
            </div>
        </div>
    );
}

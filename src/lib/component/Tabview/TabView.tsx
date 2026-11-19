import { useState } from "react";
import './style.css';

export type TabsProps = {
    tabs: { label: string, content: React.ComponentType }[]
}

export default function TabView({ tabs }: TabsProps) {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const ActiveComponent = tabs[currentIndex]?.content

    return (
        <div className="tab-view">
            <div className=" border-b border-gray-200  px-4 sticky">

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

            <div className="flex-1 overflow-y-auto px-2">
                {ActiveComponent && <ActiveComponent />}
            </div>
        </div>
    );
}

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
            <div className="tab-selectors">

                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`tab-item ${currentIndex === index
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

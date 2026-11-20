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
                        className={`tab-item ${currentIndex === index
                            ? 'rounded-t'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                            }`}
                        style={
                            currentIndex === index ?
                                {
                                    borderColor: '#2779e6g',
                                    backgroundColor: '#f5f9ff',
                                    color: '#2779e6'
                                } : {

                                }}
                    >
                        <span style={{ fontSize: '14px', lineHeight: '20px' }}>{tab.label}</span>

                    </button>

                ))}
            </div>

            <div className="flex-1 overflow-y-auto px-2">
                {ActiveComponent && <ActiveComponent />}
            </div>
        </div>
    );
}

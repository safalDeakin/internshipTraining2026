import { useUIState } from '../../hooks/useUIState';
import type { TabKey } from '../../types';
import CustomerDetails from './tabs/CustomerDetails';
import GuestFolio from './tabs/GuestFolio';
import RoomTab from './tabs/RoomTab';
import NotesTab from './tabs/NotesTab';
import StayTab from './tabs/StayTab';
import PaymentsTab from './tabs/PaymentsTab';

const tabs: { key: TabKey; label: string }[] = [
    { key: 'customer', label: 'Customer Details' },
    { key: 'folio', label: 'Guest Folio' },
    { key: 'room', label: 'Room' },
    { key: 'notes', label: 'Notes' },
    { key: 'stay', label: 'Stay' },
    { key: 'payments', label: 'Payments' },
];

const tabComponents: Record<TabKey, React.ComponentType> = {
    customer: CustomerDetails,
    folio: GuestFolio,
    room: RoomTab,
    notes: NotesTab,
    stay: StayTab,
    payments: PaymentsTab,
};

export default function ReservationTabs() {
    const { activeTab, setActiveTab } = useUIState();
    const ActiveComponent = tabComponents[activeTab];

    return (
        <div className="flex flex-col flex-1 min-h-0">
            <div className="border-b border-gray-200 bg-white px-4 shrink-0">
                <div className="flex">
                    {tabs.map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`px-4 py-2.5 text-xs font-medium border-b-2 transition-colors -mb-px ${activeTab === tab.key
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
                <ActiveComponent />
            </div>
        </div>
    );
}

import { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { useReservationState } from '../../../hooks/useReservationState';
import { useAppContext } from '../../../context/AppContext';

export default function NotesTab() {
    const { selectedReservation: r } = useReservationState();
    const { repo } = useAppContext();
    const [value, setValue] = useState(r.notes);
    const [saved, setSaved] = useState(false);

    // Sync local state when selected reservation changes
    useEffect(() => {
        setValue(r.notes);
        setSaved(false);
    }, [r.id, r.notes]);

    const handleSave = () => {
        repo.updateNotes(r.id, value);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className="py-4 px-2">
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-800">Notes</h3>
                <button
                    onClick={handleSave}
                    className="flex items-center gap-1.5 text-xs text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded transition-colors"
                >
                    <Save size={12} />
                    {saved ? 'Saved!' : 'Save'}
                </button>
            </div>
            <textarea
                value={value}
                onChange={(e) => { setValue(e.target.value); setSaved(false); }}
                rows={8}
                placeholder="Add notes about this reservation or guest..."
                className="w-full border border-gray-200 rounded p-3 text-xs text-gray-700 placeholder-gray-400 resize-none outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100 transition-colors"
            />
            <p className="text-[11px] text-gray-400 mt-1">Notes are visible to all staff members.</p>
        </div>
    );
}

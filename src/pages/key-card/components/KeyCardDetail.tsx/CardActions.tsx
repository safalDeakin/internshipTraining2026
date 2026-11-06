import { Plus } from 'lucide-react'
import { useRepoKeyCardHook } from '../../context/KeyCardProvider';
import type { CardFormType } from '../../../../domain/KeyCard';


const actions: { action: CardFormType; label: string }[] = [
    { action: 'register', label: 'Register Card' },
    { action: 'issue', label: 'Issue Card' },
    { action: 'lost', label: 'Lost' },
    { action: 'extend', label: 'Extend Validity' },
    { action: 'return', label: 'Return Card' },
    { action: 'reissue', label: 'Reissue Card' },
]

export function CardActions() {
    const { openForm } = useRepoKeyCardHook()

    return (
        <div className="flex min-h-14 flex-wrap items-center justify-start gap-2 border-b border-[#eceeef] bg-[#fbfbfb] px-2 py-2 sm:justify-end sm:px-4">
            {actions.map(({ action, label }) => (
                <button
                    key={action}
                    className="flex h-8 shrink-0 items-center gap-2 rounded-[5px] border border-[#dabfc3] bg-white px-3 text-[10px] text-[#364148]"
                    onClick={() => openForm(action)}
                >
                    <Plus size={15} strokeWidth={2} />
                    {label}
                </button>
            ))}
        </div>
    )
}

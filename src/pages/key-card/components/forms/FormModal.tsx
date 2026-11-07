import { useEffect, type ReactNode } from 'react'

export function FormModal({
    children,
    onCancel,
    onSave,
    size = 'medium',
}: {
    children: ReactNode
    onCancel: () => void
    onSave: () => void
    size?: 'medium' | 'large'
}) {
    useEffect(() => {
        const closeOnEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onCancel()
        }
        window.addEventListener('keydown', closeOnEscape)
        return () => window.removeEventListener('keydown', closeOnEscape)
    }, [onCancel])

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/45 p-3 sm:p-6"
            onMouseDown={(event) => {
                if (event.currentTarget === event.target) onCancel()
            }}
        >
            <form
                className={`my-auto w-full ${size === 'large' ? 'max-w-117.5' : 'max-w-107.5'
                    }`}
                onSubmit={(event) => {
                    event.preventDefault()
                    onSave()
                }}
            >
                <div className="rounded bg-white px-3 pb-4 pt-3 shadow-[0_2px_6px_rgba(0,0,0,0.18)] sm:px-4">
                    <div className="space-y-4">{children}</div>
                    <div className="mt-6 flex items-center justify-center gap-5">
                        <button
                            type="button"
                            className="h-7.5 min-w-23 border border-[#a6a9ad] bg-[#f5f5f5] px-5 text-[14px] text-[#17191b] shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
                            onClick={onCancel}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="h-7.5 min-w-23 bg-[#5b75ef] px-5 text-[14px] text-white shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

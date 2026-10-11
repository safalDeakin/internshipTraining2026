import { useBusinessCalendar } from "../hooks/useBusinessCalendar"
import MainContent from "./MainContent"

export default function CalendarRenderer() {

    const settings = useBusinessCalendar()

    return (
        <main className="flex min-h-dvh items-center justify-center bg-[#f5f1f1] p-6">
            <button
                className="rounded-md bg-[#0b3150] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#164a72] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0b3150]"
                onClick={settings.openDialog}
                type="button"
            >
                Open Business Calendar
            </button>

            <MainContent
                isOpen={settings.isOpen}
                onClose={settings.closeDialog}
            />
        </main>
    )
}
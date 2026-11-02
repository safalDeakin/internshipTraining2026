import { CardActions } from './CardActions'
import { CardDetails } from './CardDetails'
import { KeyCardHeader } from './KeyCardHeader'
import { KeyCardSidebar } from '../keyCardSidebar/KeyCardSidebar'
import { CardFormRenderer } from '../forms/CardFormRenderer'

export function KeyCardPage() {
    return (
        <div className="flex min-h-dvh bg-white">
            <KeyCardSidebar />
            <div className="min-w-0 flex-1 md:pl-0.5">
                <KeyCardHeader />
                <CardActions />
                <CardDetails />
            </div>
            <CardFormRenderer />
        </div>
    )
}

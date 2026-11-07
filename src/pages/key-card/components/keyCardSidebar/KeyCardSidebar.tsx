import { useRepoKeyCardHook } from '../../context/KeyCardProvider'
import ListViewHeader from '../../../../component/ListView/ListViewHeader'
import ListViewItem from '../../../../component/ListView/ListViewItem'
import ListViewList from '../../../../component/ListView/ListViewList'

export function KeyCardSidebar() {
    const {
        cards,
        selectedId,
        selectCard,
        openForm,
    } = useRepoKeyCardHook()

    return (
        <>
            <aside className="m-2 w-80 min-h-screen bg-white px-3.75 pb-3.75 pt-5">

                <ListViewHeader
                    title="Key Cards"
                    onClick={() => openForm('register')}
                />

                <div className="h-6" />

                <ListViewList
                    items={cards}
                    selectedId={selectedId ?? ""}
                    getId={(card) => card.id}
                    onSelect={(card) => selectCard(card.id)}
                    renderItem={(card, isActive) => (
                        <ListViewItem
                            title={`Card - ${card.cardNumber}`}
                            subtitle={card.technology}
                            status={card.status}
                            dateRange={card.dateRange}
                            isActive={isActive}
                        />
                    )}
                />
            </aside>
        </>
    )
}

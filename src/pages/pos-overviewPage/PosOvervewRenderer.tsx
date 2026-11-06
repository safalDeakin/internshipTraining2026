
import { RepoPosOverviewProvider } from './provider/pos-overviewProvider'
import PosOverviewPage from './components/PosOverviewPage'

const PosOvervewRenderer = () => {
    return (
        <>
            <RepoPosOverviewProvider>
                <PosOverviewPage />
            </RepoPosOverviewProvider>
        </>
    )
}

export default PosOvervewRenderer
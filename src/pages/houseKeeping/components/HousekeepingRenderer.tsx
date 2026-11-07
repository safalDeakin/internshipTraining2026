import { RepoHousekeepingProvider } from "../context/HouseKeepingProvider"
import HouseKeepingPage from "./HouseKeepingPage"

const HousekeepingRenderer = () => {
    return (
        <>
            <RepoHousekeepingProvider>
                <HouseKeepingPage />
            </RepoHousekeepingProvider>
        </>
    )
}

export default HousekeepingRenderer
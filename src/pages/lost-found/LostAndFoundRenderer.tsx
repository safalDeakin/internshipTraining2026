import { RepoLostAndFoundProvider } from "./context/LostAndFoundProvider"
import LostAndFoundPage from "./components/LostAndFoundPage"

const LostAndFoundRenderer = () => {
    return (
        <>
            <RepoLostAndFoundProvider>
                <LostAndFoundPage />
            </RepoLostAndFoundProvider>
        </>
    )
}

export default LostAndFoundRenderer
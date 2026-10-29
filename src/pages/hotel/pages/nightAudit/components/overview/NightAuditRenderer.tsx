import { NightAuditProvider } from "../../context/NightAuditProvider"
import { NightAuditOverview } from "./NightAuditOverview"

const NightAuditRenderer = () => {
    return (
        <NightAuditProvider>
            <NightAuditOverview />
        </NightAuditProvider>
    )
}

export default NightAuditRenderer
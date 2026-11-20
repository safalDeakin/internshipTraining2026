import { ReportBuilderProvider } from "./provider/ReportBuilderProvider"
import Report from "./Report"

const ReportBuilderRenderer = () => {
    return (
        <>
            <ReportBuilderProvider>
                <Report />
            </ReportBuilderProvider>
        </>
    )
}

export default ReportBuilderRenderer
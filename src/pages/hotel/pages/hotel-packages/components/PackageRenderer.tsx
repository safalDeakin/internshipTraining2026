import PackagePage from './PackagePage'
import { RepoPackageProvider } from '../context/RepoPackageProvider'

const PackageRenderer = () => {
    return (
        <>
            <RepoPackageProvider>
                <PackagePage />
            </RepoPackageProvider>
        </>
    )
}

export default PackageRenderer
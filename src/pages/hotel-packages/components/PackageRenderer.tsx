import PackageListView from './PackageListView'
import { RepoPackageProvider } from '../context/RepoPackageProvider'
import { PackageDetail } from './PackageDetail'

const PackageRenderer = () => {
    return (
        <>
            <RepoPackageProvider>
                <div className="flex">

                    <PackageListView />
                    <PackageDetail />
                </div>
            </RepoPackageProvider>
        </>
    )
}

export default PackageRenderer

import { useRepoPackageHook } from "../../context/RepoPackageProvider";
import { DetailList } from "../DetailList";
import SectionHeading from "../SectionHeading";
import RoomDetail from "./RoomDetail";
import MenuDetail from "./MenuDetail";
import AddOnDetail from "./AddOnDetail";

export default function Overview() {
    const { selectedPackage } = useRepoPackageHook();

    if (!selectedPackage) return null;

    return (
        <div className="space-y-8">
            <section>
                <SectionHeading>Package information</SectionHeading>

                <div className="grid gap-6 text-xs md:grid-cols-2 md:gap-12">
                    <dl className="space-y-2">
                        {[
                            ["Package Name", selectedPackage.name],
                            ["Package Code", selectedPackage.code],
                            ["Category", selectedPackage.category],
                            ["Package Type", selectedPackage.packageType],
                        ].map(([label, value]) => (
                            <div
                                className="grid grid-cols-[110px_minmax(0,1fr)] gap-3"
                                key={label}
                            >
                                <dt className="text-[#696965]">{label}</dt>
                                <dd className="font-medium">{value}</dd>
                            </div>
                        ))}

                        <div className="grid grid-cols-1 gap-1 pt-1 sm:grid-cols-[110px_minmax(0,1fr)] sm:gap-3">
                            <dt className="text-[#696965]">Description</dt>
                            <dd className="max-w-xl leading-relaxed">
                                {selectedPackage.description}
                            </dd>
                        </div>
                    </dl>

                    <DetailList items={selectedPackage.bookingDetails} />
                </div>
            </section>

            <RoomDetail compact />

            <div className="grid gap-7 xl:grid-cols-2">
                <MenuDetail compact />
                <AddOnDetail compact />
            </div>
        </div>
    );
}

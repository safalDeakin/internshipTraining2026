
import { DetailList } from "../DetailList";
import SectionHeading from "../SectionHeading";
import RoomDetail from "./RoomDetail";
import MenuDetail from "./MenuDetail";
import AddOnDetail from "./AddOnDetail";
import type { HotelPackage } from "../../../../../../domain/hotel-package";

interface OverviewProps {
    packageData: HotelPackage

}

export default function Overview({
    packageData
}: OverviewProps) {

    if (!packageData) return null;

    return (
        <div className="space-y-8">
            <section>
                <SectionHeading>Package information</SectionHeading>

                <div className="grid gap-6 text-xs md:grid-cols-2 md:gap-12">
                    <dl className="space-y-2">
                        {[
                            ["Package Name", packageData.name],
                            ["Package Code", packageData.code],
                            ["Category", packageData.category],
                            ["Package Type", packageData.packageType],
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
                                {packageData.description}
                            </dd>
                        </div>
                    </dl>

                    <DetailList items={packageData.bookingDetails} />
                </div>
            </section>

            <RoomDetail packageData={packageData} compact />


            <div className="grid gap-7 xl:grid-cols-2">
                <MenuDetail packageData={packageData} compact />
                <AddOnDetail packageData={packageData} compact />
            </div>
        </div>
    );
}

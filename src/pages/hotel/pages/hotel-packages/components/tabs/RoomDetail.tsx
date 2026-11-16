
import type { HotelPackage } from "../../../../../../domain/hotel-package";
import { DetailList } from "../DetailList";
import SectionHeading from "../SectionHeading";

interface RoomDetailProps {
    packageData: HotelPackage
    compact?: boolean;
}

export default function RoomDetail({
    packageData
}: RoomDetailProps) {

    if (!packageData) return null;

    return (

        <section>
            <SectionHeading>Room detail</SectionHeading>
            <div className="grid gap-6 text-xs md:grid-cols-2 md:gap-12">
                <DetailList items={packageData.roomDetails} />
                <DetailList items={packageData.roomCharges} />
            </div>
        </section>
    );
}

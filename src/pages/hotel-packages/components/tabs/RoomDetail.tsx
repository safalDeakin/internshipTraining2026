
import { useRepoPackageHook } from "../../context/RepoPackageProvider";
import { DetailList } from "../DetailList";
import SectionHeading from "../SectionHeading";

interface RoomDetailProps {
    compact?: boolean;
}

export default function RoomDetail({
}: RoomDetailProps) {
    const { selectedPackage } = useRepoPackageHook();

    if (!selectedPackage) return null;

    return (

        <section>
            <SectionHeading>Room detail</SectionHeading>
            <div className="grid gap-6 text-xs md:grid-cols-2 md:gap-12">
                <DetailList items={selectedPackage.roomDetails} />
                <DetailList items={selectedPackage.roomCharges} />
            </div>
        </section>
    );
}

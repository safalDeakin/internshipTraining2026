
import { useRepoPackageHook } from "../../context/RepoPackageProvider";
import SectionHeading from "../SectionHeading";

interface AddOnDetailProps {
    compact?: boolean;
}

export default function AddOnDetail({
    compact = false,
}: AddOnDetailProps) {
    const { selectedPackage } = useRepoPackageHook();

    if (!selectedPackage) return null;

    return (
        <section>
            <SectionHeading>Service & add on</SectionHeading>

            <div className="overflow-x-auto border-y border-[#d7d7d4]">
                <table
                    className={`w-full min-w-105 text-left text-[14px] ${compact ? "" : "max-w-4xl"
                        }`}
                >
                    <thead className="bg-[#f5f5f3] text-[14px] text-[#777773]">
                        <tr>
                            <th className="px-3 py-2 font-medium">Service</th>
                            <th className="px-3 py-2 font-medium">Details</th>
                        </tr>
                    </thead>

                    <tbody>
                        {selectedPackage.addOns.map((item) => (
                            <tr
                                className="border-t border-[#eeeeeb]"
                                key={item.service}
                            >
                                <td className="px-3 py-2 font-medium">
                                    {item.service}
                                </td>
                                <td className="px-3 py-2 capitalize">
                                    {item.details}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

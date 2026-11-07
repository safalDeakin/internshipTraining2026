
import { useRepoPackageHook } from "../../context/RepoPackageProvider";
import SectionHeading from "../SectionHeading";

interface MenuDetailProps {
    compact?: boolean;
}

export default function MenuDetail({
    compact = false,
}: MenuDetailProps) {
    const { selectedPackage } = useRepoPackageHook();

    if (!selectedPackage) return null;

    return (
        <section>
            <SectionHeading>Menu summary</SectionHeading>

            <div className="overflow-x-auto border-y border-[#d7d7d4]">
                <table
                    className={`w-full min-w-115 text-left text-[14px] ${compact ? "" : "max-w-4xl"
                        }`}
                >
                    <thead className="bg-[#f5f5f3] text-[14px] text-[#777773]">
                        <tr>
                            <th className="px-3 py-2 font-medium">Meal Type</th>
                            <th className="px-3 py-2 font-medium">Item Included</th>
                            <th className="px-3 py-2 font-medium">Service Type</th>
                        </tr>
                    </thead>

                    <tbody>
                        {selectedPackage.menu.map((item) => (
                            <tr
                                className="border-t border-[#eeeeeb]"
                                key={item.mealType}
                            >
                                <td className="px-3 py-2">{item.mealType}</td>
                                <td className="px-3 py-2 font-medium">
                                    {item.included}
                                </td>
                                <td className="px-3 py-2">{item.serviceType}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

import { Circle, Pencil } from "lucide-react";

interface BusinessDay {
    label: string;
    isWeekend: boolean;
}

interface BusinessInfo {
    name: string;
    address: string;
    fiscalYear: string;
    openingTime: string;
    days: BusinessDay[];
}

interface BusinessInfoHeaderProps {
    info: BusinessInfo;
}

export default function BusinessInfromation({
    info,
}: BusinessInfoHeaderProps) {
    return (
        <div className="mb-5 flex items-start gap-6 rounded-lg border border-gray-200 bg-white px-5 py-4">
            {/* Business Information */}
            <div className="min-w-0 flex-1">
                <a
                    href="#"
                    onClick={(event) => event.preventDefault()}
                    className="block text-base font-semibold leading-snug text-blue-600 hover:underline"
                >
                    {info.name}
                </a>

                <p className="mt-1 text-sm text-gray-600">
                    {info.address}
                </p>

                <p className="mt-1 text-xs text-gray-400">
                    <span className="text-gray-500">
                        Current Fiscal Year
                    </span>

                    <span className="mx-2">
                        {info.fiscalYear}
                    </span>
                </p>
            </div>

            {/* Divider */}
            <div className="mx-2 w-px self-stretch bg-gray-200" />

            {/* Opening Time + Days */}
            <div className="flex shrink-0 flex-col gap-2">
                {/* Opening Time */}
                <div className="flex items-center gap-2">
                    <Circle
                        size={12}
                        className="shrink-0 fill-yellow-400 text-yellow-400"
                    />

                    <span className="text-sm text-gray-500">
                        Opening Time:
                    </span>

                    <span className="text-sm font-medium text-blue-600">
                        {info.openingTime}
                    </span>

                    <Pencil
                        size={13}
                        className="ml-1 cursor-pointer text-blue-400 hover:text-blue-600"
                    />
                </div>

                {/* Operating Days */}
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">
                        Days:
                    </span>

                    {info.days.map((day) => (
                        <span
                            key={day.label}
                            className={`text-sm font-medium ${day.isWeekend
                                ? "text-red-500"
                                : "text-blue-600"
                                }`}
                        >
                            {day.label}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

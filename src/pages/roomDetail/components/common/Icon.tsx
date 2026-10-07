import {
    Bath,
    Bed,
    Pencil,
    SlidersHorizontal,
    Search,
    Tv,
} from "lucide-react";

type IconProps = {
    name:
        | "air"
        | "bath"
        | "bed"
        | "edit"
        | "filter"
        | "search"
        | "tv";
    className?: string;
};

export default function Icon({
    name,
    className = "h-5 w-5",
}: IconProps) {
    // Custom AC icon
    if (name === "air") {
        return (
            <svg
                className={className}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
            >
                <rect x="3" y="4" width="18" height="12" rx="3" />
                <path d="M7 12h10M8 19v2m4-5v5m4-2v2" />
                <circle
                    cx="17"
                    cy="8"
                    r=".6"
                    fill="currentColor"
                />
            </svg>
        );
    }

    // Lucide React icons
    const icons = {
        bath: Bath,
        bed: Bed,
        edit: Pencil,
        filter: SlidersHorizontal,
        search: Search,
        tv: Tv,
    };

    const IconComponent = icons[name];

    return (
        <IconComponent
            className={className}
            strokeWidth={1.8}
            aria-hidden="true"
        />
    );
}

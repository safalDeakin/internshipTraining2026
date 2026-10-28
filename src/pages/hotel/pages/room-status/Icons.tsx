import {
    Building2,
    Bed,
    ChevronDown,
    Search,
    CalendarDays,
    Plus,
    Sparkles,
    Wrench,
    Menu,
    Pencil,
} from "lucide-react";

import type { LucideProps } from "lucide-react";

type IconProps = LucideProps;

export function BuildingIcon(props: IconProps) {
    return <Building2 {...props} />;
}

export function BedIcon(props: IconProps) {
    return <Bed {...props} />;
}

export function ChevronDownIcon(props: IconProps) {
    return <ChevronDown {...props} />;
}

export function SearchIcon(props: IconProps) {
    return <Search {...props} />;
}

export function CalendarIcon(props: IconProps) {
    return <CalendarDays {...props} />;
}

export function PlusIcon(props: IconProps) {
    return <Plus {...props} />;
}

export function SparkleIcon(props: IconProps) {
    return <Sparkles {...props} />;
}

export function WrenchIcon(props: IconProps) {
    return <Wrench {...props} />;
}

export function MenuIcon(props: IconProps) {
    return <Menu {...props} />;
}

export function PencilIcon(props: IconProps) {
    return <Pencil {...props} />
}
import type { ReactNode } from "react";

interface CardTitleProps {
    children: ReactNode;
}

export default function CardTitle({ children }: CardTitleProps) {
    return <h2 className="card-title">{children}</h2>;
}
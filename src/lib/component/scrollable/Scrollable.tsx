import type { ReactNode } from "react";
import "./style.css";

export default function Scrollable({
  direction,
  children,
}: {
  direction: "x" | "y";
  children: ReactNode;
}) {
  if (direction == "y") {
    return (
      <div className="min-h-0 flex-1 overflow-y-auto">
        {/* children that exceeds the height will scroll */}
        {children}
      </div>
    );
  } else {
    return (
      <div className="min-w-0 flex-1 overflow-x-auto">
        {/* children that exceeds the height will scroll */}
        {children}
      </div>
    );
  }
}

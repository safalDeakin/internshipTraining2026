import type { ReactNode } from "react";

export default function Frame({ children }: { children: ReactNode }) {
  return (
    <div
      className="flex flex-1 min-h-0 min-w-0  w-full bg-white"
      style={{ padding: "4px", gap: "4px" }}
    >
      {children}
    </div>
  );
}

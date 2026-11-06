import type { ReactNode } from "react";

export function DetailSectionContainer({ children }: { children: ReactNode }) {

    return (
        // <main className="mt-5 min-h-243 flex-1 bg-white px-9 py-10">
        //     <div className="max-w-200">
        //         {children}
        //     </div>
        // </main>

        <div className="max-w-200">
            {children}
        </div>

    );
}
import { useState } from "react";
import LayoutPreview from "./LayoutPreview";

type Orientation =
    | "left"
    | "right"
    | "top-nav"
    | "side-nav";

const orientations = [
    {
        id: "left",
        label: "Left Handed",
    },
    {
        id: "right",
        label: "Right Handed",
    },
    {
        id: "top-nav",
        label: "Top Nav",
    },
    {
        id: "side-nav",
        label: "Side Nav",
    },
] as const;

export default function OrientationSection() {
    const [orientation, setOrientation] =
        useState<Orientation>("left");

    return (
        <section>
            <h2 className="border-b border-[#e8e8e8] pb-1.5 text-[13px] font-semibold text-[#222]">
                Appearances-Orientations
            </h2>

            <div className="mt-2.5 grid grid-cols-2 gap-x-4.5 gap-y-2.5">
                {orientations.map(({ id, label }) => (
                    <label
                        key={id}
                        className="flex cursor-pointer flex-col gap-1"
                    >
                        <span className="flex items-center gap-1.25 text-[11px] font-medium text-[#333]">
                            <input
                                type="radio"
                                name="orientation"
                                value={id}
                                checked={orientation === id}
                                onChange={() =>
                                    setOrientation(id)
                                }
                                className="accent-[#6c3fcf]"
                            />

                            {label}
                        </span>

                        <span className="ml-4.25 text-[10px] italic leading-3.5 text-[#777]">
                            Automatically apply Services Charges when
                            generating invoices.
                        </span>

                        <div className="ml-4.25 mt-0.5">
                            <LayoutPreview orientation={id} />
                        </div>
                    </label>
                ))}
            </div>
        </section>
    );
}
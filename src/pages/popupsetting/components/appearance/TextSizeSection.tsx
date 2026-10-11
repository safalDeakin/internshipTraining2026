import { useState } from "react";

type TextSize = "small" | "medium" | "large";

const textSizes = [
    {
        id: "small",
        label: "Small - Text",
        size: 14,
    },
    {
        id: "medium",
        label: "Medium - Text",
        size: 16,
    },
    {
        id: "large",
        label: "Large - Text",
        size: 18,
    },
] as const;

export default function TextSizeSection() {
    const [textSize, setTextSize] =
        useState<TextSize>("medium");

    return (
        <section>
            <h2 className="border-b border-[#e8e8e8] pb-1.5 text-[13px] font-semibold text-[#222]">
                Text-Sizes
            </h2>

            <div className="mt-2.5 grid grid-cols-3 gap-3.5">
                {textSizes.map(({ id, label, size }) => (
                    <label
                        key={id}
                        className="flex cursor-pointer flex-col gap-1"
                    >
                        <span className="flex items-center gap-1.25 text-[11px] font-medium text-[#333]">
                            <input
                                type="radio"
                                name="text-size"
                                value={id}
                                checked={textSize === id}
                                onChange={() =>
                                    setTextSize(id)
                                }
                                className="accent-[#6c3fcf]"
                            />

                            {label}
                        </span>

                        <span className="ml-4 text-[10px] italic text-[#777]">
                            Base Fonts Size is set to {size}
                        </span>

                        <div
                            className="ml-4 mt-0.75 flex h-14.5 w-19.5 items-center justify-center border border-[#d5d8da] bg-white text-[#333]"
                            style={{
                                fontSize: `${size * 0.55}px`,
                            }}
                        >
                            <span className="text-center">
                                Asdfgh
                                <br />
                                qwerty
                            </span>
                        </div>
                    </label>
                ))}
            </div>
        </section>
    );
}
import { useState } from "react";
import LayoutPreview from "./LayoutPreview";

type Theme = "light" | "dark";

export default function ThemeSection() {
    const [theme, setTheme] = useState<Theme>("light");

    return (
        <section>
            <h2 className="border-b border-[#e8e8e8] pb-1.5 text-[13px] font-semibold text-[#222]">
                Appearances - Theme
            </h2>

            <div className="mt-2.5 grid grid-cols-2 gap-x-4.5">
                {(["light", "dark"] as const).map((item) => (
                    <label
                        key={item}
                        className="flex cursor-pointer flex-col gap-1"
                    >
                        <span className="flex items-center gap-1.25 text-[11px] font-medium text-[#333]">
                            <input
                                type="radio"
                                name="theme"
                                value={item}
                                checked={theme === item}
                                onChange={() => setTheme(item)}
                                className="accent-[#6c3fcf]"
                            />

                            {item === "light"
                                ? "Light Mode"
                                : "Dark Mode"}
                        </span>

                        <span className="ml-4.25 text-[10px] italic text-[#777]">
                            {item === "light"
                                ? "Sets Light Colors."
                                : "Sets Dark Color (Recommended for eyes)"}
                        </span>

                        <div className="ml-4.25 mt-0.5">
                            <LayoutPreview dark={item === "dark"} />
                        </div>
                    </label>
                ))}
            </div>
        </section>
    );
}
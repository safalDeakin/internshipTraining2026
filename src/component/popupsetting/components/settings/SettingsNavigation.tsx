import { ExternalLink } from "lucide-react";
import { settingsNavigation } from "../../data/settingsNavigation";
import type { SettingsSection } from "../../types/settings";

interface SettingsNavigationProps {
    activeSection: SettingsSection;
    onSectionChange: (section: SettingsSection) => void;
}

export default function SettingsNavigation({
    activeSection,
    onSectionChange,
}: SettingsNavigationProps) {
    return (
        <aside className="flex min-h-134.5 flex-col border border-[#e1e4e5] bg-white p-1.25 max-sm:min-h-0">
            <nav
                aria-label="Settings sections"
                className="space-y-px"
            >
                {settingsNavigation.map(
                    ({ id, label, icon: Icon }) => {
                        const isActive = activeSection === id;

                        return (
                            <button
                                key={id}
                                aria-current={isActive ? "page" : undefined}
                                className={`flex h-6.75 w-full items-center gap-2 rounded-[3px] border px-1 text-left text-[11px] text-[#294056] transition-colors ${isActive
                                    ? "border-[#4a9df0] bg-[#f7fbff] shadow-[inset_0_0_0_1px_rgba(74,157,240,0.08)]"
                                    : "border-transparent hover:bg-[#f5f8fa]"
                                    }`}
                                onClick={() => onSectionChange(id)}
                                type="button"
                            >
                                <Icon
                                    aria-hidden="true"
                                    size={15}
                                    strokeWidth={1.45}
                                />

                                {label}
                            </button>
                        );
                    }
                )}
            </nav>

            <a
                className="mt-auto inline-flex items-center gap-1 self-start px-3 pb-px text-[11px] text-[#0789f9] underline underline-offset-2"
                href="https://example.com"
                rel="noreferrer"
                target="_blank"
            >
                Learn More

                <ExternalLink
                    aria-hidden="true"
                    size={11}
                    strokeWidth={1.6}
                />
            </a>
        </aside>
    );
}
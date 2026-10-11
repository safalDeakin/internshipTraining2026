

import type { SettingsSection } from "../../types/settings";

import AppearancePanel from "../appearance/AppearancePanel";
import DevicesPanel from "../DevicesPanel";
import AccountPanel from "../account/AccountPanel"
import HelpPanel from "../HelpPanel";

interface SettingsContentProps {
    activeSection: SettingsSection;
}

export default function SettingsContent({
    activeSection,
}: SettingsContentProps) {
    return (
        <main className="min-w-0 border border-[#e1e4e5] bg-white px-4 pb-5 pt-4.5  h-135 overflow-y-auto hide-scrollbar">
            {activeSection === "appearance" ? (
                <AppearancePanel />
            ) : activeSection === "devices" ? (
                <DevicesPanel />
            ) : activeSection === "accounts" ? (
                <AccountPanel />
            ) : (
                <HelpPanel />
            )}
        </main>
    );
}


import type { SettingsSection } from "../../types/settings";

import AppearancePanel from "../AppearancePanel";
import DevicesPanel from "../DevicesPanel";
import ProfileSection from "../account/ProfileSection";
import PersonalInformation from "../account/PersonalInformation";
import AccountSettings from "../account/AccountSettings";
import Verifications from "../account/Verifications";

interface SettingsContentProps {
    activeSection: SettingsSection;
}

export default function SettingsContent({
    activeSection,
}: SettingsContentProps) {
    return (
        <main className="min-w-0 overflow-y-auto border border-[#e1e4e5] bg-white px-4 pb-5 pt-4.5">
            {activeSection === "appearance" ? (
                <AppearancePanel />
            ) : activeSection === "devices" ? (
                <DevicesPanel />
            ) : (
                <>
                    <ProfileSection
                    />

                    <PersonalInformation />

                    <AccountSettings />

                    <Verifications />
                </>
            )}
        </main>
    );
}
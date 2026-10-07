
export type SettingsSection =
    | "appearance"
    | "accounts"
    | "devices";

export interface SettingsDialogProps {
    activeSection: SettingsSection;
    isOpen: boolean;
    onClose: () => void;
    onSectionChange: (section: SettingsSection) => void;
}
import { UtensilsCrossed, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { SidebarHugeButton } from "../../lib/shared/erpSidebarHeader/SidebarHugeButton";

import {
  ERPSidebarHeader,
  type DropdownMenuSection,
} from "../../lib/shared/erpSidebarHeader/ERPSidebarHeader";

import {
  NavGroup,
  type NavItemModel,
} from "../../lib/component/Sidebar/NavigationGroup";

import SidebarContainer from "../../lib/component/Sidebar/SidebarContainer";

import { useAuth } from "../../lib/utils/secureclient/useAuth";
import { getOrganizationPath } from "../../lib/utils/secureclient/services/models/orgPath";

import ShellSetting from "./modal/settings/Settings";

import useDialogBox from "../../lib/component/DialogueBox/useDialogueBox";
import useDrawer from "../../lib/component/Drawer/useDrawer";

import UserSessionProvider from "../../shell/context/UserSessionProvider";
import RunPOSSession from "../../shell/RunPOSSession";
import { usePOSNavList } from "../../shell/context/PosNavListProvider";
import SessionNavGroup from "./nav/SessionNavGroup";

interface RestaurantNavbarProps {
  closeBar?: () => void;
}

const dropDownMenu: DropdownMenuSection[] = [
  {
    title: "Menu",
    items: [
      { label: "Products", path: "products" },
      { label: "Pricelist", path: "price" },
      { label: "Offers", path: "offer" },
    ],
  },
  {
    title: "Configuration",
    items: [
      { label: "Sales Setting", path: "sales-settings" },
      { label: "Staffs and Access", path: "staffs" },
      { label: "Device Setup", path: "devices" },
    ],
  },
  {
    title: "Shell Profile",
    items: [{ label: "Shell-Setting", path: "shell-settings" }],
  },
];

const overviewSection = {
  key: "overview",
  label: "Overview",
  items: [
    {
      key: "salesSummary",
      label: "Sales Summary",
      path: "sales",
    },
    {
      key: "cashSummary",
      label: "Cash Summary",
      path: "cash",
    },
  ] as NavItemModel[],
};

const SETTING_PATHS = ["staffs", "devices", "shell-settings"];

export default function RestaurantNav({ closeBar }: RestaurantNavbarProps) {
  const { organization } = useAuth();

  const navigate = useNavigate();

  const { showDialog, closeDialog } = useDialogBox();
  const { openDrawer } = useDrawer();

  // Navigation session context
  const { getLatestSession } = usePOSNavList();

  const [activeSubItem, setActiveSubItem] = useState<{
    groupKey: string;
    navItemKey: string;
  } | null>(null);

  // Get latest session
  const latestSession =
    organization?.id != null ? getLatestSession(organization.id) : undefined;

  // Navigate or open settings
  const go = (path: string) => {
    if (SETTING_PATHS.includes(path)) {
      showDialog({
        title: "Shell Settings",
        closeOnBackdrop: true,
        closeOnEscape: true,
        content: <ShellSetting onClose={closeDialog} />,
      });
    } else {
      navigate(getOrganizationPath(`/restaurant/${path}`, organization));
    }

    closeBar?.();
  };

  const handleSubItemClick = (groupKey: string, item: NavItemModel) => {
    setActiveSubItem({
      groupKey,
      navItemKey: item.key,
    });

    go(item.path);
  };

  const header = (
    <ERPSidebarHeader
      title="Restaurant"
      icon={<UtensilsCrossed />}
      menu={dropDownMenu}
      onClick={go}
    >
      <SidebarHugeButton
        title={
          latestSession?.status === "active"
            ? "Continue POS session"
            : latestSession?.status === "paused"
              ? "Resume POS session"
              : "Start POS session"
        }
        ariaLabel="Open POS session"
        onClick={() => {
          if (!organization?.id) return;

          openDrawer({
            title: "Shell Settings",
            width: "100%",
            closeOnBackdrop: false,
            closeOnEscape: false,
            showHeader: false,
            content: (
              <UserSessionProvider orgId={String(organization.id)}>
                <RunPOSSession />
              </UserSessionProvider>
            ),
          });

          closeBar?.();
        }}
      >
        <Play className="h-3 w-3 text-blue-700" />
      </SidebarHugeButton>
    </ERPSidebarHeader>
  );

  return (
    <SidebarContainer header={header}>
      <NavGroup
        key={overviewSection.key}
        label={overviewSection.label}
        items={overviewSection.items}
        activeGroup={activeSubItem?.groupKey}
        activeItem={activeSubItem?.navItemKey}
        onNavItemClick={handleSubItemClick}
      />

      {organization?.id != null && (
        <SessionNavGroup reRouteTo={go} organizationId={organization.id} />
      )}
    </SidebarContainer>
  );
}

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

import { usePOSUserSession } from "../../shell/hooks/usePOSUserSession";
import type { POSSession } from "../../shell/types/posSessionTypes";
import { SessionNavGroup } from "./nav/SessionNavGroup";
import ShellSetting from "./modal/settings/ShellSetting";
import useDialogBox from "../../lib/component/DialogueBox/useDialogueBox";
import OpenPOSSession from "../../shell/OpenPosSession";
import useDrawer from "../../lib/component/Drawer/useDrawer";

interface RestaurantNavbarProps {
  closeBar?: () => void;
  openSessionMode?: () => void;
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

// These paths open settings in a drawer/modal instead of navigating.
const SETTING_PATHS = ["staffs", "devices", "shell-settings"];

export default function RestaurantNav({
  closeBar,
}: RestaurantNavbarProps) {

  const { organization } = useAuth();
  const navigate = useNavigate();
  const { showDialog, closeDialog } = useDialogBox();
  const { openDrawer, closeDrawer } = useDrawer();
  const {
    getLatestSession,
    selectedDate,
    selectedStaffName,
    setSelectedDate,
    setSelectedStaffName,
  } = usePOSUserSession();

  const openSessionMode = () => {
    openDrawer(
      {
        title: "Shell Settings",
        width: "1100px",
        closeOnBackdrop: true,
        closeOnEscape: true,
        showHeader: false,
        content: <OpenPOSSession ></OpenPOSSession>,
      }

    );
  }

  const onOpenSetting = () => {
    showDialog({
      title: "Shell Settings",

      closeOnBackdrop: true,
      closeOnEscape: true,
      content: <ShellSetting onClose={closeDialog} ></ShellSetting>,
    });
  }

  const [activeSubItem, setActiveSubItem] = useState<{
    groupKey: string;
    navItemKey: string;
  } | null>(null);

  const latestSession =
    organization?.id != null ? getLatestSession(organization.id) : undefined;

  const playTitle =
    latestSession?.status === "active"
      ? "Continue POS session"
      : latestSession?.status === "paused"
        ? "Resume POS session"
        : "Start POS session";

  // Open a setting or navigate to a page.
  const go = (path: string) => {
    if (SETTING_PATHS.includes(path)) {
      onOpenSetting();
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

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedStaffName(null);
    go("pos-overview");
  };

  const handleStaffSelect = (session: POSSession) => {
    setSelectedStaffName(session.staffName);
    setSelectedDate(null);
    go("pos-overview");
  };

  const header = (
    <ERPSidebarHeader
      title="Restaurant"
      icon={<UtensilsCrossed />}
      menu={dropDownMenu}
      onClick={go}
    >
      <SidebarHugeButton
        title={playTitle}
        ariaLabel="Open POS session"
        onClick={() => {
          openSessionMode?.();
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

      <SessionNavGroup
        organizationId={organization!.id}
        selectedDate={selectedDate!}
        selectedStaffName={selectedStaffName!}
        handleDateSelect={handleDateSelect}
        handleStaffSelect={handleStaffSelect}

      ></SessionNavGroup>
    </SidebarContainer>
  );
}

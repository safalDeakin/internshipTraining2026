import { UtensilsCrossed, Play, ChevronDown } from "lucide-react";
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
import { SessionNavList } from "../../shell/SessionNavlist";
import type { POSSession } from "../../shell/types/posSessionTypes";

interface RestaurantNavbarProps {
  closeBar?: () => void;
  openSessionMode?: () => void;
  onOpenSetting?: (setting: string) => void;
}

const restaurantMenu: DropdownMenuSection[] = [
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
  openSessionMode,
  onOpenSetting,
}: RestaurantNavbarProps) {
  const { organization } = useAuth();
  const navigate = useNavigate();

  const {
    getLatestSession,
    selectedDate,
    selectedStaffName,
    setSelectedDate,
    setSelectedStaffName,
  } = usePOSUserSession();

  const [posSessionsOpen, setPosSessionsOpen] = useState(true);

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
      onOpenSetting?.(path);
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
      menu={restaurantMenu}
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

      {/* POS Sessions */}
      <div>
        <button
          type="button"
          onClick={() => setPosSessionsOpen((open) => !open)}
          className="flex w-full items-center gap-1 rounded-lg px-2 pb-2 text-left text-gray-800 hover:bg-blue-50"
        >
          <ChevronDown
            className={`h-5 w-5 text-gray-500 transition-transform ${
              posSessionsOpen ? "rotate-180 text-blue-500" : ""
            }`}
          />

          <span className="font-medium">POS Sessions</span>
        </button>

        {posSessionsOpen && (
          <SessionNavList
            organizationId={organization?.id}
            selectedDate={selectedDate}
            selectedStaffName={selectedStaffName}
            onDateSelect={handleDateSelect}
            onSessionSelect={handleStaffSelect}
          />
        )}
      </div>
    </SidebarContainer>
  );
}

import type { SetStateAction } from "react";
import type { POSSession } from "../types/posSessionTypes";
import ReusableButton from "../shared/components/ReusableButton";
import { Play, X } from "lucide-react";

export type ContinueSessionProps = {
  session: POSSession;
  handleOpenClosingForm: () => void;
  handleContinueSession: () => void
  setIsPausedPromptOpen: (value: SetStateAction<boolean>) => void
}


export default function ContinueSession({ session, handleOpenClosingForm, handleContinueSession, setIsPausedPromptOpen }: ContinueSessionProps) {


  return (<div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
    <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">
          Paused POS Session
        </h2>

        <button
          type="button"
          onClick={() => setIsPausedPromptOpen(false)}
          className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
          aria-label="Close"
        >
          <X size={20} />
        </button>
      </div>

      <p className="mb-2 text-sm text-gray-600">
        You have an unfinished POS session.
      </p>

      <div className="mb-6 rounded-lg bg-gray-50 p-4 text-sm">
        <p>
          <span className="font-medium">Staff:</span>{" "}
          {session.staffName}
        </p>

        <p className="mt-1">
          <span className="font-medium">Terminal:</span>{" "}
          {session.terminal}
        </p>

        <p className="mt-1">
          <span className="font-medium">Mode:</span> {session.mode}
        </p>

        <p className="mt-1">
          <span className="font-medium">Opening cash:</span> Rs.{" "}
          {session.openingCash}
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <ReusableButton
          variant="primary"
          size="lg"
          onClick={handleContinueSession}
          className="w-full"
        >
          <span className="flex items-center justify-center gap-2">
            <Play size={17} />
            Continue Previous Session
          </span>
        </ReusableButton>

        <ReusableButton
          variant="danger"
          size="lg"
          onClick={handleOpenClosingForm}
          className="w-full"
        >
          End Previous Session
        </ReusableButton>
      </div>
    </div>
  </div>);
}


{/* 
    From line 214 Restaurant Layout
     <ContinueSession
          session={pausedSession}
          handleContinueSession={handleContinueSession}
          handleOpenClosingForm={handleOpenClosingForm}
          setIsPausedPromptOpen={setIsPausedPromptOpen}
        >
        </ContinueSession>
    
    
    */}

{
  /*
  
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
import { SessionNavGroup } from "./SessionNavGroup";

interface RestaurantNavbarProps {
closeBar?: () => void;
openSessionMode?: () => void;
onOpenSetting?: (setting: string) => void;
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

  
  
  */
}
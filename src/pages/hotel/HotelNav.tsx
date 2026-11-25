// author: Shrajja

import { BrushCleaning, Building, Files, Hotel } from "lucide-react";

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

interface AccommodationNavbarProps {
  closeBar?: () => void;

  // Parent callback: tells HotelLayout which option was selected.
  onSelectView: (view: string) => void;
}

// Accommodation dropdown options.
const accommodationMenu: DropdownMenuSection[] = [
  {
    title: "Manage",
    items: [
      { label: "All Rooms", path: "all-rooms" },
      { label: "Transportation", path: "transport" },
      { label: "Rate Plan", path: "rate-plan" },
      { label: "Offers and Discounts", path: "offers" },
      { label: "Billing", path: "billing" },
    ],
  },
  {
    title: "Configuration",
    items: [
      {
        label: "Sales Settings",
        path: "sales-settings",
        icon: Files,
      },
      {
        label: "Staff and Access",
        path: "staff-access",
        icon: Files,
      },
      {
        label: "Device Setup",
        path: "device-setup",
        icon: Files,
      },
    ],
  },
  {
    title: "Operations",
    items: [
      {
        label: "Room and HouseKeeping",
        path: "housekeeping",
      },
      {
        label: "Day Activity",
        path: "dayactivity",
        children: [
          {
            label: "July/2026",
            path: "dayactivity/july-2026",
            // children: [
            //   {
            //     label: "1st July - P123",
            //     path: "dayactivity/july-2026/1st-july-p123",
            //   },
            //   {
            //     label: "1st west-P123",
            //     path: "dayactivity/july-2026/1st-west-p123",
            //   },
            // ],
          },
          {
            label: "Sun-24-July/2026",
            path: "dayactivity/july-2026",
            // children: [
            //   {
            //     label: "TiyaPiya-c3-1344",
            //     path: "dayactivity/sun-24-july-2026/tiyapiya-c3-1344",
            //   },
            //   {
            //     label: "RamSta-c1-1144",
            //     path: "dayactivity/sun-24-july-2026/ramsta-c1-1144",
            //   },
            // ],
          },
        ],
      },
      {
        label: "Lost and Found",
        path: "lost-found",
      },
    ],
  },
];

export interface MenuSection {
  key: string;
  label: string;
  items: NavItemModel[];
}
// Main sidebar options.
const menuSection: MenuSection[] = [
  {
    key: "frontdesk",
    label: "Front-Desk",
    items: [
      {
        key: "holdReservation",
        label: "Pending",
        path: "hold-reservation",
        count: 5,
      },
      {
        key: "guestRequest",
        label: "Guest Request",
        path: "guest-request",
        count: 5,
      },
      {
        key: "hallReservation",
        label: "Hall Reservation",
        path: "hall-reservation",
        count: 5,
      },
      {
        key: "hotelPackage",
        label: "Hotel Package",
        path: "hotel-package",
        count: 5,
      },
      {
        key: "arrivals",
        label: "Arrivals",
        path: "arrivals",
        count: 5,
      },
      {
        key: "inHouse",
        label: "In-House",
        path: "in-house",
        count: 5,
      },
      {
        key: "overdue",
        label: "Overdue",
        path: "overdue",
        count: 5,
      },
    ],
  },
  {
    key: "reservation",
    label: "Reservation",
    items: [
      {
        key: "reservationList",
        label: "All Reservations",
        path: "all-reservation",
      },
      {
        key: "reservationCalendar",
        label: "Reservation Calendar",
        path: "reservation-calendar",
      },
    ],
  },
];

export default function HotelNav({
  closeBar,
  onSelectView,
}: AccommodationNavbarProps) {
  const [activeSubItem, setActiveSubItem] = useState<{
    groupKey: string;
    navItemKey: string;
  } | null>(null);

  // Used by Front-Desk, Rooms, and Reservation options.
  const handleSubItemClick = (groupKey: string, item: NavItemModel) => {
    setActiveSubItem({
      groupKey,
      navItemKey: item.key,
    });

    // Send the selected option to the parent.
    onSelectView(item.path);
    closeBar?.();
  };

  const header = (
    <ERPSidebarHeader
      title="Hotel"
      icon={<Hotel />}
      menu={accommodationMenu}
      onClick={(path: string) => {
        onSelectView(path);
        closeBar?.();
      }}
    >
      {/* Housekeeping + Maintenance */}
      <SidebarHugeButton
        title="Housekeeping and Maintenance"
        ariaLabel="Open Housekeeping and Maintenance"
        onClick={() => {
          onSelectView("quick-housekeeping");
          closeBar?.();
        }}
      >
        <BrushCleaning className="h-4 w-4 text-blue-700" />
      </SidebarHugeButton>
      {/* Room Details Renderer */}
      <SidebarHugeButton
        title="Room Details"
        ariaLabel="Open Room Details"
        onClick={() => {
          onSelectView("quick-rooms");
          closeBar?.();
        }}
      >
        <Building className="h-4 w-4 text-blue-700" />
      </SidebarHugeButton>
    </ERPSidebarHeader>
  );

  return (
    <SidebarContainer header={header}>
      {/* MAIN NAVIGATION */}
      {menuSection.map((menu) => {
        return (
          <NavGroup
            key={menu.key}
            label={menu.label}
            items={menu.items}
            activeGroup={activeSubItem?.groupKey}
            activeItem={activeSubItem?.navItemKey}
            onNavItemClick={handleSubItemClick}
          ></NavGroup>
        );
      })}
    </SidebarContainer>
  );
}

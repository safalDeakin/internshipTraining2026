// author: Shrajja

import {
  BrushCleaning,
  Building,
  ChevronDown,
  Files,
  Hotel,
  ListChevronsDownUp,
  type LucideIcon,
} from "lucide-react";

import { useState } from "react";

interface AccommodationNavbarProps {
  closeBar?: () => void;

  // Parent callback: tells HotelLayout which option was selected.
  onSelectView: (view: string) => void;
}

type AccommodationMenuItem = {
  label: string;
  path: string;
  icon?: LucideIcon;
};

type AccommodationMenuSection = {
  title: string;
  items: AccommodationMenuItem[];
};

type MenuKey = "frontdesk" | "rooms" | "reservation";

interface MenuItem {
  key: string;
  label: string;
  path: string;
  count?: number;
}

interface MenuSection {
  key: MenuKey;
  label: string;
  items: MenuItem[];
}

// Accommodation dropdown options.
const accommodationMenu: AccommodationMenuSection[] = [
  {
    title: "Manage",
    items: [
      { label: "All Rooms", path: "all-rooms" },
      { label: "Rate Plan", path: "rate-plan" },
      { label: "Offers and Discounts", path: "offers" },
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
        label: "Night Audit",
        path: "night-audit",
      },
      {
        label: "Lost and Found",
        path: "lost-found",
      },
    ],
  },
];

// Main sidebar options.
const menuSection: MenuSection[] = [
  {
    key: "frontdesk",
    label: "Front-Desk",
    items: [
      {
        key: "guestRequest",
        label: "Guest Request",
        path: "guest-request",
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
    key: "rooms",
    label: "Rooms",
    items: [
      {
        key: "roomList",
        label: "Room List",
        path: "room",
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

const linkBase = "flex justify-between pb-2 rounded-xl";
const linkActive = "text-blue-500";
const linkInactive = "hover:bg-blue-50";

export default function HotelNav({
  closeBar,
  onSelectView,
}: AccommodationNavbarProps) {
  const [isAccommodationOpen, setIsAccommodationOpen] =
    useState(false);

  const [openSubMenus, setOpenSubMenus] = useState<MenuKey[]>([]);

  const [activeSubItem, setActiveSubItem] = useState<{
    menu: MenuKey;
    key: string;
  } | null>(null);

  // Used by the Hotel dropdown options.
  const handleAccommodationClick = (path: string) => {
    onSelectView(path);
    setIsAccommodationOpen(false);
    closeBar?.();
  };

  // Used by Front-Desk, Rooms, and Reservation options.
  const handleSubItemClick = (
    menu: MenuKey,
    item: MenuItem,
  ) => {
    setActiveSubItem({
      menu,
      key: item.key,
    });

    // Send the selected option to the parent.
    onSelectView(item.path);

    closeBar?.();
  };

  // Expand/collapse a menu section.
  const toggleSubMenu = (menu: MenuKey) => {
    setOpenSubMenus((current) =>
      current.includes(menu)
        ? current.filter((item) => item !== menu)
        : [...current, menu],
    );
  };

  return (
    <nav className="flex h-full w-full max-h-screen flex-col bg-white p-3">
      {/* HEADER */}
      <div className="relative flex w-full items-center justify-between gap-2">
        <div className="flex w-full items-center gap-1 px-1 py-2">
          <Hotel />

          <span>Hotel</span>

          <button
            type="button"
            className="shrink-0"
            aria-label="Toggle accommodation menu"
            onClick={() =>
              setIsAccommodationOpen((current) => !current)
            }
          >
            <ChevronDown
              className={`h-4 w-4 transition-transform ${isAccommodationOpen
                ? "rotate-180 text-blue-500"
                : ""
                }`}
            />
          </button>

          {/* ACCOMMODATION DROPDOWN */}
          {isAccommodationOpen && (
            <div className="absolute left-0 top-full z-50 mt-1 w-full rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
              <div className="flex w-full flex-col gap-5">
                {accommodationMenu.map((section) => (
                  <div
                    key={section.title}
                    className="border-b border-gray-300 pb-3 last:border-b-0"
                  >
                    <p className="text-sm text-gray-700">
                      {section.title}
                    </p>

                    <div className="mt-2 flex flex-col gap-1">
                      {section.items.map((item) => {
                        const Icon = item.icon;

                        return (
                          <button
                            key={item.path}
                            type="button"
                            onClick={() =>
                              handleAccommodationClick(item.path)
                            }
                            className={`${linkBase} w-full items-center px-2 py-2 text-left ${linkInactive}`}
                          >
                            <span>{item.label}</span>

                            {Icon && (
                              <Icon className="h-4 w-4" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* QUICK ACCESS ICONS */}
        <div className="flex justify-between gap-4">
          {/* Housekeeping + Maintenance */}
          <div className="rounded-lg border border-gray-300 p-2">
            <button
              type="button"
              title="Housekeeping and Maintenance"
              aria-label="Open Housekeeping and Maintenance"
              onClick={() => {
                onSelectView("quick-housekeeping");
                closeBar?.();
              }}
            >
              <BrushCleaning className="h-4 w-4 text-blue-700" />
            </button>
          </div>

          {/* Room Details Renderer */}
          <div className="rounded-lg border border-gray-300 p-2">
            <button
              type="button"
              title="Room Details"
              aria-label="Open Room Details"
              onClick={() => {
                onSelectView("quick-rooms");
                closeBar?.();
              }}
            >
              <Building className="h-4 w-4 text-blue-700" />
            </button>
          </div>
        </div>
      </div>

      {/* DIVIDER */}
      <div className="mx-1 mb-2 h-px bg-gray-100" />

      {/* MAIN NAVIGATION */}
      <div className="flex flex-col gap-1 pr-1">
        {menuSection.map((menu) => {
          const isOpen = openSubMenus.includes(menu.key);

          return (
            <div key={menu.key} className="w-full">
              <button
                type="button"
                onClick={() => toggleSubMenu(menu.key)}
                className={`flex w-full items-center gap-2 rounded-xl py-2 ${isOpen ? linkActive : linkInactive
                  }`}
              >
                <ChevronDown
                  className={`h-5 w-5 transition-transform duration-200 ${isOpen
                    ? "rotate-180 text-blue-500"
                    : ""
                    }`}
                />

                {menu.label}
              </button>

              {isOpen && (
                <div className="mt-1 flex w-full flex-col gap-1 border-b border-gray-100 bg-white p-1.5">
                  {menu.items.map((item) => {
                    const isSelected =
                      activeSubItem?.menu === menu.key &&
                      activeSubItem?.key === item.key;

                    return (
                      <button
                        key={item.key}
                        type="button"
                        onClick={() =>
                          handleSubItemClick(menu.key, item)
                        }
                        className={`${linkBase} w-full items-center px-2 py-2 text-left ${isSelected
                          ? linkActive
                          : linkInactive
                          }`}
                      >
                        <div className="flex w-full items-center justify-between gap-2">
                          <p className="flex items-center gap-2">
                            <ListChevronsDownUp className="h-4 w-4" />

                            <span>{item.label}</span>
                          </p>

                          {item.count !== undefined && (
                            <span>({item.count})</span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}
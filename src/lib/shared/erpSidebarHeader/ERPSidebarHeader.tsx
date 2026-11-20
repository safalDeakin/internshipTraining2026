import { ChevronDown, type LucideIcon } from "lucide-react";
import { useState, type ReactNode } from "react";
import "./style.css";

type DropdownMenuItem = {
  label: string;
  path: string;
  icon?: LucideIcon;
};

export type DropdownMenuSection = {
  title: string;
  items: DropdownMenuItem[];
};

export function ERPSidebarHeader({
  icon,
  title,
  menu,
  children,
  onClick,
}: {
  icon: ReactNode;
  title: string;
  menu: DropdownMenuSection[];
  onClick: (path: string) => void;
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuClick = (path: string) => {
    onClick(path);
    setIsOpen(false);
  };

  return (
    <div className="erp-sidebar-header">
      <div>
        <button
          type="button"
          className="sidebar-header-top-selector-button"
          aria-label="Toggle accommodation menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
        >
          <span className="sidebar-header-top-selector-label-icon">
            <span className="sidebar-header-top-selector-icon">{icon}</span>

            <span className="sidebar-header-top-selector-title">{title}</span>
          </span>

          <ChevronDown
            className={`sidebar-header-top-selector-arrow transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <SidebarHeaderDropdown menu={menu} onClick={handleMenuClick} />
        )}
      </div>

      {/* QUICK ACCESS ICONS */}
      <div className="flex gap-2">{children}</div>
    </div>
  );
}

export function SidebarHeaderDropdown({
  menu,
  onClick,
}: {
  menu: DropdownMenuSection[];
  onClick: (path: string) => void;
}) {
  return (
    <div className="sidebar-header-dropdown">
      {menu.map((section) => (
        <div key={section.title}>
          <div className="sidebar-header-dropdown-group">
            <div className="sidebar-header-dropdown-group-title">
              {section.title}
            </div>

            <div className="sidebar-header-dropdown-group-item-section">
              {section.items.map((item) => {
                const Icon = item.icon;

                return (
                  <button
                    type="button"
                    className="sidebar-header-dropdown-group-item"
                    key={item.path}
                    onClick={() => onClick(item.path)}
                  >
                    <span>{item.label}</span>

                    {Icon && <Icon className="h-4 w-4" />}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="sidebar-header-dropdown-hr" />
        </div>
      ))}
    </div>
  );
}

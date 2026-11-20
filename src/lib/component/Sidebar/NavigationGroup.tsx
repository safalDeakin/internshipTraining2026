import { ChevronDown, ListChevronsDownUp } from "lucide-react";
import { useState, type ReactNode } from "react";
import './style.css';


export interface NavItemModel {
    key: string;
    label: string;
    path: string;
    count?: number;
}

export function NavGroup({ label, key, items, activeGroup, activeItem, onNavItemClick }: {
    label: string,
    items: NavItemModel[],
    key: string
    activeGroup?: string,
    activeItem?: string,
    onNavItemClick: (groupKey: string, navItemKey: NavItemModel) => void
}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className='sidebar-nav-group'>
            <button
                onClick={() => setIsOpen((current) => !current)}
                className={`
                    sidebar-nav-group-selector
                    ${isOpen ? 'sidebar-nav-active' : ''
                    }`}
            >
                <ChevronDown
                    className={`
                        sidebar-nav-group-downicon
                        ${isOpen
                            ? "rotate-180 "
                            : ""
                        }`}
                />
                <span className='sidebar-nav-group-title'>{label}</span>
            </button>

            {/* dropdown */}
            {isOpen && (

                <div className='sidebar-nav-item-section '>
                    {
                        items.map((item) => {
                            const isSelected =
                                activeGroup === key &&
                                activeItem === item.key;
                            return (
                                <NavItem
                                    key={item.key}
                                    icon={<ListChevronsDownUp className="h-4 w-4" />}
                                    label={item.label}
                                    isSelected={isSelected}
                                    count={item.count!}
                                    onClick={() =>
                                        onNavItemClick(key, item)}
                                />
                            );
                        })}
                </div>

            )
            }
        </div >
    );
}

export function NavItem({ key, icon, label, onClick, isSelected, count }: {
    key: string,
    icon?: ReactNode,
    label: string,
    count?: number,
    onClick: () => void,
    isSelected: boolean
}) {
    return (
        <button
            key={key}
            type="button"
            onClick={onClick}
            // change here for on select effect
            className={`sidebar-nav-item ${isSelected
                ? 'sidebar-nav-item-active sidebar-nav-item-active'
                : ""
                }`}
        >

            <p className="sidebar-nav-item-wrapper">
                <span className='sidebar-nav-item-icon'>{icon}</span>

                <span className='sidebar-nav-item-label'>{label}</span>
            </p>
            {count !== undefined && (
                <span>({count})</span>
            )}
        </button>
    );
}
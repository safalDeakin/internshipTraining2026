import type { ReactNode } from "react";
import './style.css';

export function SidebarHugeButton(
    { title, ariaLabel, onClick, children }:
        {
            children: ReactNode, title: string, ariaLabel: string, onClick: () => void
        }) {
    return (
        <div aria-label={ariaLabel}
            title={title} onClick={onClick}>
            <button
                className="sidebar-header-huge-button"
                type="button"
            >
                {children}
            </button>
        </div>
    );
}

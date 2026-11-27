import React, { type ReactNode } from "react";
import './style.css';
export type SidebarContainerProps = {
    header?: ReactNode;
    children: ReactNode;
    footer?: ReactNode;
}

export default function SidebarContainer({ header, children, footer }: SidebarContainerProps) {
    return (
        <nav>
            <div className="sidebar-container">
                {header && <div>{header}</div>}

                {/* DIVIDER */}
                {/* {header && <div style={{ height: "1px", backgroundColor: "grey" }} />} */}

                <div className='sidebar-container-body' style={{ height: '100%' }}>{children}</div>
                {
                    footer && <div className='sidebar-footer'>{footer}</div>
                }
            </div >
        </nav>
    );
}
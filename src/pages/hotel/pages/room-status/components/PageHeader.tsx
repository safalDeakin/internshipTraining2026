import { CalendarIcon, PencilIcon } from "../Icons";

export function PageHeader() {
    return (
        <>
            <header className="top-header">
                <div>
                    <p className="hotel-name">Vintage Yard Hotel</p>
                </div>
                <div className="account">
                    <span className="avatar">US</span>
                    <span>
                        <strong>Utsha Shrestha</strong>
                        <small>View details</small>
                    </span>
                </div>
            </header>

            <div className="page-heading">
                <div>
                    <h1 className="room-status">Room status</h1>
                </div>
                <div className="header-actions">
                    <button className="button secondary" type="button"><CalendarIcon /> Room report</button>
                    <div className="border " />
                    <button className="button primary" type="button"><PencilIcon /> Add room</button>
                    <button className="button primary action-wide" type="button"><PencilIcon /> Generate housekeeping task</button>
                    <button className="button primary action-wide" type="button"><PencilIcon /> Maintenance task</button>
                </div>
            </div>
        </>
    );
}

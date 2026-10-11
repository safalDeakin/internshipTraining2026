

const Footer = () => {
    const MAX_ITEMS = 10
    return (
        <div>
            <div className="table-footer">
                <div className="selection-box">

                    <div className="selection-info">
                        <div className="selection-count">
                            {/* {props.selectedItems.length} items selected */}
                            2 item selected
                        </div>

                        <div className="selection-limit">
                            You can add up to {MAX_ITEMS} items.
                        </div>
                    </div>

                    <button className="view-selected-button">
                        View Selected
                    </button>
                </div>

                <div className="footer-buttons">
                    <button className="cancel-button">Cancel</button>
                    <button className="save-button">Save</button>
                </div>

            </div></div>
    )
}

export default Footer
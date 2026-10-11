interface ItemsActionsProps {
    onChange: () => void;
    onAddItem: () => void;
}

const ItemsActions = ({
    onChange,
    onAddItem,
}: ItemsActionsProps) => {
    return (
        <div className="items-actions">
            <button
                className="btn-edit"
                onClick={onChange}
            >
                Change
            </button>

            <button
                className="btn-edit"
                onClick={onAddItem}
            >
                Insert Item
            </button>
        </div>
    );
};

export default ItemsActions;
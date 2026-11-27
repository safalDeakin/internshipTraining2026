import { Trash2, X } from "lucide-react";

interface DeleteConfirmationModalProps {
  title?: string;
  message?: string;
  itemName?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirmationModal = ({
  title = "Delete Confirmation",
  message = "Are you sure you want to delete this item?",
  itemName,
  onConfirm,
  onCancel,
}: DeleteConfirmationModalProps) => {
  return (
    <div className="w-full max-w-md rounded-lg  p-5">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>

        <button
          type="button"
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-800"
        >
          <X size={18} />
        </button>
      </div>

      {/* Content */}
      <div className="mb-6 flex items-start gap-3">
        <div className="rounded-full bg-red-100 p-3 text-red-600">
          <Trash2 size={20} />
        </div>

        <div>
          <p className="text-sm text-gray-700">{message}</p>

          {itemName && (
            <p className="mt-2 font-semibold text-gray-900">{itemName}</p>
          )}

          <p className="mt-2 text-xs text-gray-500">
            This action cannot be undone.
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={onConfirm}
          className="flex items-center gap-2 rounded-md bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
        >
          <Trash2 size={14} />
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;

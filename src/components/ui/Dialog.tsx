interface DialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
}

export default function Dialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmText,
  cancelText,
}: DialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-lg font-semibold">{title}</h2>
        <p className="mb-6">{description}</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="rounded-lg bg-gray-500 px-4 py-2 text-white"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="rounded-lg bg-red-500 px-4 py-2 text-white"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

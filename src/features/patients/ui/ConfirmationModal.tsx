
interface Props {
  open: boolean
  title: string
  description: string
  onCancel: () => void
  onConfirm: () => void
}

export default function ConfirmationModal({
  open,
  title,
  description,
  onCancel,
  onConfirm,
}: Props) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-[var(--color-surface)] border border-[var(--color-border-base)] rounded-xl shadow-xl p-6 w-full max-w-md space-y-5">
        <h2 className="text-xl font-semibold text-[var(--color-text)]">{title}</h2>
        <p className="text-sm text-[var(--color-text-soft)]">{description}</p>

        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm rounded border border-[var(--color-border-base)] text-[var(--color-text)] hover:bg-[var(--color-hover-surface)] transition"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm rounded bg-[var(--color-error)] text-white hover:bg-red-600 transition"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  )
}

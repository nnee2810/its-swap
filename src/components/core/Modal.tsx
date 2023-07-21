import clsx from "clsx"
import { PropsWithChildren, ReactNode } from "react"

export interface ModalProps {
  visible: boolean
  onClose: () => void
  name: string
  actions?: ReactNode
  disabled?: boolean
  className?: string
}
export default function Modal({
  visible,
  onClose,
  name,
  actions,
  disabled,
  className,
  children,
}: PropsWithChildren<ModalProps>) {
  return (
    <div
      className={clsx("modal", {
        "visible opacity-100 pointer-events-auto": visible,
      })}
    >
      <div className={clsx("modal-box", className)}>
        <div className="text-xl font-medium">{name}</div>
        <div className="py-4">{children}</div>
        <div className="flex justify-end gap-2">
          {actions}
          <button
            type="button"
            className="btn"
            disabled={disabled}
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

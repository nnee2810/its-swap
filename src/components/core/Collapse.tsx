import { PropsWithChildren } from "react"

interface CollapseProps {
  title: string
}

export default function Collapse({
  title,
  children,
}: PropsWithChildren<CollapseProps>) {
  return (
    <div className="collapse bg-base-200 border">
      <input type="checkbox" />
      <div className="collapse-title font-medium text-sm px-4 py-2">
        {title}
      </div>
      <div className="collapse-content bg-white">
        <div className="pt-2">{children}</div>
      </div>
    </div>
  )
}

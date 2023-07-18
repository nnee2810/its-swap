import clsx from "clsx"
import { InputHTMLAttributes } from "react"

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant: "text"
  isInvalid?: boolean
}

export default function TextInput({
  variant,
  isInvalid,
  className,
  ...props
}: TextInputProps) {
  return (
    <input
      {...props}
      className={clsx(
        "input input-sm input-bordered w-full",
        {
          "input-error": isInvalid,
        },
        className
      )}
    />
  )
}

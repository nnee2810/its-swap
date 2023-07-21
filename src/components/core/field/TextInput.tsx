import clsx from "clsx"
import { InputHTMLAttributes } from "react"

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant: "text"
  isInvalid?: boolean
}

export default function TextInput({
  // eslint-disable-next-line no-unused-vars
  variant,
  isInvalid,
  className,
  ...props
}: TextInputProps) {
  return (
    <input
      {...props}
      className={clsx(
        "input input-bordered w-full",
        {
          "input-error": isInvalid,
        },
        className
      )}
    />
  )
}

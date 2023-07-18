import { FieldErrors, FieldValues } from "react-hook-form"

export function getFieldError(errors: FieldErrors<FieldValues>, name: string) {
  if (errors?.[name]) return String(errors[name]?.message)
  return null
}

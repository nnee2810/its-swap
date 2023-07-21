import { getFieldError } from "helpers/getFieldError"
import { Controller, useFormContext } from "react-hook-form"
import TextInput, { TextInputProps } from "./TextInput"

interface FieldBaseProps {
  name: string
  label?: string
}

type FieldProps = TextInputProps & FieldBaseProps

export default function Field(props: FieldProps) {
  const { variant, name, label } = props
  const {
    control,
    formState: { errors },
  } = useFormContext()

  return (
    <div className="mb-2">
      {label && <div className="text-sm">{label}</div>}
      <Controller
        control={control}
        name={name}
        render={({ field: { ref, ...field } }) => (
          <>
            {variant === "text" && (
              <TextInput
                isInvalid={!!getFieldError(errors, props.name)}
                {...props}
                {...field}
              />
            )}
          </>
        )}
      />

      {!!getFieldError(errors, props.name) && (
        <div className="text-xs text-red-500">
          {getFieldError(errors, props.name)}
        </div>
      )}
    </div>
  )
}

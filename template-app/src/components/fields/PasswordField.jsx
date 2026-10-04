import { PasswordInput } from '@mantine/core'

function PasswordField({ field, value, onChange }) {
  return (
    <PasswordInput
      label={field.label}
      placeholder={field.placeholder}
      value={value}
      onChange={(event) => onChange(event.currentTarget.value)}
      required={field.required}
      description={field.description}
      error={field.error}
      disabled={field.disabled}
      withAsterisk={field.required}
    />
  )
}

export default PasswordField

import { TextInput } from '@mantine/core'

function EmailField({ field, value, onChange }) {
  return (
    <TextInput
      type="email"
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

export default EmailField

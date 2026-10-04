import { Checkbox } from '@mantine/core'

function CheckboxField({ field, value, onChange }) {
  return (
    <Checkbox
      label={field.label}
      checked={Boolean(value)}
      onChange={(event) => onChange(event.currentTarget.checked)}
      required={field.required}
      description={field.description}
      error={field.error}
      disabled={field.disabled}
    />
  )
}

export default CheckboxField

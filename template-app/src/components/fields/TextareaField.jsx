import { Textarea } from '@mantine/core'

function TextareaField({ field, value, onChange }) {
  return (
    <Textarea
      label={field.label}
      placeholder={field.placeholder}
      value={value}
      onChange={(event) => onChange(event.currentTarget.value)}
      required={field.required}
      description={field.description}
      error={field.error}
      disabled={field.disabled}
      withAsterisk={field.required}
      autosize
      minRows={field.minRows || 3}
      maxRows={field.maxRows || 8}
    />
  )
}

export default TextareaField

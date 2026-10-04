import { NumberInput } from '@mantine/core'

function NumberField({ field, value, onChange }) {
  return (
    <NumberInput
      label={field.label}
      placeholder={field.placeholder}
      value={value}
      onChange={onChange}
      required={field.required}
      min={field.min}
      max={field.max}
      step={field.step}
      decimalScale={field.decimalScale}
      allowNegative={field.allowNegative !== false}
      clampBehavior="strict"
    />
  )
}

export default NumberField

import { Radio } from '@mantine/core'

function RadioField({ field, value, onChange }) {
  return (
    <Radio.Group
      label={field.label}
      value={value}
      onChange={onChange}
      name={field.name}
      required={field.required}
      withAsterisk={field.required}
      description={field.description}
      error={field.error}
    >
      {field.options.map((option) => (
        <Radio
          key={option}
          value={option}
          label={option}
        />
      ))}
    </Radio.Group>
  )
}

export default RadioField

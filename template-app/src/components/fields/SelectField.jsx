import { Select } from '@mantine/core'

function SelectField({ field, value, onChange }) {
  return (
    <Select
      label={field.label}
      placeholder={field.placeholder || 'Выберите'}
      value={value}
      onChange={onChange}
      data={field.options}
      required={field.required}
      description={field.description}
      error={field.error}
      disabled={field.disabled}
      withAsterisk={field.required}
      clearable
      searchable
      nothingFoundMessage="Ничего не найдено"
    />
  )
}

export default SelectField

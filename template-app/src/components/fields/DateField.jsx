import { DateInput } from '@mantine/dates'

function DateField({ field, value, onChange }) {
  return (
    <DateInput
      label={field.label}
      placeholder={field.placeholder || 'Выберите дату'}
      value={value}
      onChange={(date) => onChange(date)}
      required={field.required}
      clearable
      valueFormat="DD.MM.YYYY" // Формат отображения: 31.12.2025
      // minDate={new Date()} // Раскомментируйте, если нужно запретить прошлые даты
    />
  )
}

export default DateField

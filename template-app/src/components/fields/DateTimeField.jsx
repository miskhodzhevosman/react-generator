import { DateTimePicker } from '@mantine/dates'

function DateTimeField({ field, value, onChange }) {
  return (
    <DateTimePicker
      label={field.label}
      placeholder={field.placeholder || 'Выберите дату и время'}
      value={value}
      onChange={(date) => onChange(date)}
      required={field.required}
      clearable
      valueFormat="DD.MM.YYYY HH:mm" // Формат отображения: 31.12.2025 14:30
    />
  )
}

export default DateTimeField

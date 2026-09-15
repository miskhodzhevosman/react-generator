function DateTimeField({ field, value, onChange }) {
  return (
    <div>
      <label>{field.label}</label>

      <input
        type="datetime-local"
        name={field.name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

export default DateTimeField
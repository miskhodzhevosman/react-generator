function DateField({ field, value, onChange }) {
  return (
    <div>
      <label>{field.label}</label>

      <input
        type="date"
        name={field.name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

export default DateField
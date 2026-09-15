function CheckboxField({ field, value, onChange }) {
  return (
    <label>
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
      />

      {field.label}
    </label>
  )
}

export default CheckboxField
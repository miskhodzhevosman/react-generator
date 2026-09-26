function SelectField({ field, value, onChange }) {
  return (
    <div>
      <label>{field.label}</label>

      <select
        name={field.name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Выберите</option>

        {field.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default SelectField

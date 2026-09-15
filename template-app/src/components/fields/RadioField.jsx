function RadioField({ field, value, onChange }) {
  return (
    <div>
      <label>{field.label}</label>

      {field.options.map((option) => (
        <label key={option}>
          <input
            type="radio"
            name={field.name}
            value={option}
            checked={value === option}
            onChange={(e) => onChange(e.target.value)}
          />

          {option}
        </label>
      ))}
    </div>
  )
}

export default RadioField
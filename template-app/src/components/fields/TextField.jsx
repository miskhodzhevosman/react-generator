function TextField({ field, value, onChange }) {
  return (
    <div>
      <label>{field.label}</label>

      <input
        type="text"
        name={field.name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder}
      />
    </div>
  )
}

export default TextField
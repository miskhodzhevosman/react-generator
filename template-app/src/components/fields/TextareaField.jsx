function TextareaField({ field, value, onChange }) {
  return (
    <div>
      <label>{field.label}</label>

      <textarea
        name={field.name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder}
      />
    </div>
  )
}

export default TextareaField
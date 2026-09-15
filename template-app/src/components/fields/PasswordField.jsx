function PasswordField({ field, value, onChange }) {
  return (
    <div>
      <label>{field.label}</label>

      <input
        type="password"
        name={field.name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder}
      />
    </div>
  )
}

export default PasswordField
function FileField({ field, onChange }) {
  return (
    <div>
      <label>{field.label}</label>

      <input
        type="file"
        onChange={(e) => onChange(e.target.files[0])}
      />
    </div>
  )
}

export default FileField
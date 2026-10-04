function FileField({ field, value, initial, onChange }) {
  const isImage = field.type === 'image'

  return (
    <div className="file-field">
      <label className="file-field__label">{field.label}</label>

      {initial && typeof initial === 'string' && (
        <div className="file-field__current">
          {isImage ? (
            <img
              src={initial}
              alt={field.label}
              className="file-field__preview"
            />
          ) : (
            <a
              href={initial}
              target="_blank"
              rel="noreferrer"
              className="file-field__link"
            >
              текущий файл
            </a>
          )}
        </div>
      )}

      <input
        type="file"
        name={field.name}
        accept={field.accept}
        onChange={(e) => {
          const f = e.target.files[0]
          if (f) onChange(f)
          // если пользователь очистил input — не трогаем values,
          // старое значение не должно вернуться как строка
        }}
      />

      {value instanceof File && (
        <span className="file-field__new">
          выбран: {value.name} ({Math.round(value.size / 1024)} KB)
        </span>
      )}
    </div>
  )
}

export default FileField

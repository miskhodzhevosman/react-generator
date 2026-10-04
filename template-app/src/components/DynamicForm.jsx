import { useState } from 'react'

import TextField from './fields/TextField'
import NumberField from './fields/NumberField'
import EmailField from './fields/EmailField'
import PasswordField from './fields/PasswordField'
import SelectField from './fields/SelectField'
import AutocompleteField from './fields/AutocompleteField'
import CheckboxField from './fields/CheckboxField'
import RadioField from './fields/RadioField'
import DateField from './fields/DateField'
import DateTimeField from './fields/DateTimeField'
import TextareaField from './fields/TextareaField'
import FileField from './fields/FileField'

import './css/DynamicForm.css'

const fieldComponents = {
  text: TextField,
  number: NumberField,
  email: EmailField,
  password: PasswordField,
  select: SelectField,
  autocomplete: AutocompleteField,
  checkbox: CheckboxField,
  radio: RadioField,
  date: DateField,
  datetime: DateTimeField,
  textarea: TextareaField,
  file: FileField,
  image: FileField,
  int: NumberField,
}

const FILE_TYPES = new Set(['file', 'image'])

function isFileType(field) {
  return FILE_TYPES.has(field.type)
}

function DynamicForm({
  schema,
  data = {},
  initialValues: initialValuesProp = {},
  onSubmit,
  title = 'Заполните форму',
  description = 'Введите необходимые данные и отправьте форму.',
  submitLabel = 'Отправить',
}) {
  const [values, setValues] = useState(() => {
    const v = {}
    schema.forEach((field) => {
      if (isFileType(field)) {
        // Файл НЕ инициализируем из initialValues:
        // в values он попадёт только если пользователь выберет новый файл.
        return
      }
      v[field.name] = initialValuesProp[field.name] ?? ''
    })
    return v
  })

  function handleChange(name, value) {
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    const hasFileField = schema.some(isFileType)
    const hasNewFile = Object.values(values).some(
      (v) => v instanceof File || v instanceof Blob
    )

    // Если в схеме есть файлы — всегда отправляем FormData,
    // чтобы не смешивать JSON и multipart.
    if (hasFileField) {
      const fd = new FormData()

      schema.forEach((field) => {
        const v = values[field.name]
        if (v === undefined || v === null || v === '') return

        if (isFileType(field)) {
          // строку (URL старого файла) не отправляем — она и не должна
          // попадать в values, но подстрахуемся
          if (v instanceof File || v instanceof Blob) {
            fd.append(field.name, v)
          }
          return
        }

        if (typeof v === 'object') {
          fd.append(field.name, JSON.stringify(v))
        } else {
          fd.append(field.name, v)
        }
      })

      onSubmit(fd, { values, hasNewFile })
      return
    }

    // Нет file-полей — обычный JSON
    onSubmit(values, { values, hasNewFile: false })
  }

  function getFieldData(field) {
    const key = field.options?.key
    if (!key) return null
    return data[key] || null
  }

  return (
    <div className="dynamic-form-wrapper">
      <form className="dynamic-form" onSubmit={handleSubmit}>
        <div className="dynamic-form__header">
          {title && <h2 className="dynamic-form__title">{title}</h2>}
          {description && (
            <p className="dynamic-form__description">{description}</p>
          )}
        </div>

        <div className="dynamic-form__fields">
          {schema.map((field) => {
            const FieldComponent = fieldComponents[field.type]
            if (!FieldComponent) return null

            const fieldData = getFieldData(field)

            const isFullWidth =
              field.type === 'textarea' ||
              field.type === 'file' ||
              field.type === 'image' ||
              field.type === 'checkbox' ||
              field.type === 'radio'

            return (
              <div
                key={field.name}
                className={
                  isFullWidth
                    ? 'dynamic-form__field dynamic-form__field--full'
                    : 'dynamic-form__field'
                }
              >
                <FieldComponent
                  field={field}
                  value={values[field.name]}
                  initial={initialValuesProp[field.name]}
                  dataSource={fieldData}
                  onChange={(value) => handleChange(field.name, value)}
                />
              </div>
            )
          })}
        </div>

        <div className="dynamic-form__footer">
          <button className="dynamic-form__submit" type="submit">
            <span>{submitLabel}</span>
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </form>
    </div>
  )
}

export default DynamicForm

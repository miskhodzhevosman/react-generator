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
}

function DynamicForm({
  schema,
  data = {},
  initialValues: initialValuesProp = {},
  onSubmit,
  title = 'Заполните форму',
  description = 'Введите необходимые данные и отправьте форму.',
}) {
  const [values, setValues] = useState(() => {
    const v = {}
    schema.forEach((field) => {
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
    onSubmit(values)
  }

  function getFieldData(field) {
    const key = field.options?.key

    if (!key) {
      return null
    }

    return data[key] || null
  }

  return (
    <div className="dynamic-form-wrapper">
      <form
        className="dynamic-form"
        onSubmit={handleSubmit}
      >
        <div className="dynamic-form__header">
          <h2>{title}</h2>

          {description && (
            <p>{description}</p>
          )}
        </div>

        <div className="dynamic-form__fields">
          {schema.map((field) => {
            const FieldComponent = fieldComponents[field.type]

            if (!FieldComponent) {
              return null
            }

            const fieldData = getFieldData(field)

            const isFullWidth =
              field.type === 'textarea' ||
              field.type === 'file' ||
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
                  dataSource={fieldData}
                  onChange={(value) =>
                    handleChange(field.name, value)
                  }
                />
              </div>
            )
          })}
        </div>

        <div className="dynamic-form__footer">
          <button
            className="dynamic-form__submit"
            type="submit"
          >
            <span>Отправить</span>
            <span aria-hidden="true">
              →
            </span>
          </button>
        </div>
      </form>
    </div>
  )
}

export default DynamicForm

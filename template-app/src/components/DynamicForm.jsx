import { useState } from 'react'
import { Button, Paper, Stack, SimpleGrid, Title, Text, Box } from '@mantine/core'

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

const FULL_WIDTH_TYPES = new Set([
  'textarea',
  'file',
  'image',
  'checkbox',
  'radio',
])

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
      if (isFileType(field)) return
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

    if (hasFileField) {
      const fd = new FormData()

      schema.forEach((field) => {
        const v = values[field.name]
        if (v === undefined || v === null || v === '') return

        if (isFileType(field)) {
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

    onSubmit(values, { values, hasNewFile: false })
  }

  function getFieldData(field) {
    const key = field.options?.key
    if (!key) return null
    return data[key] || null
  }

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      shadow="sm"
      p="xl"
      radius="md"
      withBorder
      maw={720}
      mx="auto"
    >
      <Stack gap="lg">
        {(title || description) && (
          <Box>
            {title && (
              <Title order={3} mb={4}>
                {title}
              </Title>
            )}
            {description && (
              <Text c="dimmed" size="sm">
                {description}
              </Text>
            )}
          </Box>
        )}

        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
          {schema.map((field) => {
            const FieldComponent = fieldComponents[field.type]
            if (!FieldComponent) return null

            const fieldData = getFieldData(field)
            const isFullWidth = FULL_WIDTH_TYPES.has(field.type)

            return (
              <Box
                key={field.name}
                style={
                  isFullWidth
                    ? { gridColumn: '1 / -1' }
                    : undefined
                }
              >
                <FieldComponent
                  field={field}
                  value={values[field.name]}
                  initial={initialValuesProp[field.name]}
                  dataSource={fieldData}
                  onChange={(value) => handleChange(field.name, value)}
                />
              </Box>
            )
          })}
        </SimpleGrid>

        <Button type="submit" rightSection="→" size="md" fullWidth={false}>
          {submitLabel}
        </Button>
      </Stack>
    </Paper>
  )
}

export default DynamicForm

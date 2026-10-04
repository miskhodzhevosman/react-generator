import { FileInput, Image, Anchor, Text, Stack } from '@mantine/core'

function FileField({ field, value, initial, onChange }) {
  const isImage = field.type === 'image'

  return (
    <Stack gap="xs">
      <FileInput
        label={field.label}
        placeholder={field.placeholder || 'Выберите файл'}
        accept={field.accept}
        value={value instanceof File ? value : null}
        onChange={(file) => {
          if (file) onChange(file)
          // если пользователь очистил — не трогаем values,
          // старое значение не должно вернуться как строка
        }}
        required={field.required}
        description={field.description}
        error={field.error}
        disabled={field.disabled}
        withAsterisk={field.required}
        clearable
      />

      {initial && typeof initial === 'string' && (
        <div>
          {isImage ? (
            <Image
              src={initial}
              alt={field.label}
              w={120}
              h={120}
              fit="cover"
              radius="sm"
            />
          ) : (
            <Anchor
              href={initial}
              target="_blank"
              rel="noreferrer"
              size="sm"
            >
              Текущий файл
            </Anchor>
          )}
        </div>
      )}

      {value instanceof File && (
        <Text size="xs" c="dimmed">
          Выбран: {value.name} ({Math.round(value.size / 1024)} KB)
        </Text>
      )}
    </Stack>
  )
}

export default FileField

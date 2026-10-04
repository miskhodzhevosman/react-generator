import { useEffect, useState } from 'react'
import { TextInput, CloseButton } from '@mantine/core'

function SearchInput({
  value,
  onChange,
  placeholder = 'Поиск...',
  delay = 400,
  minLength = 3,
}) {
  const [local, setLocal] = useState(value ?? '')

  // синхронизация при внешнем сбросе
  useEffect(() => {
    setLocal(value ?? '')
  }, [value])

  useEffect(() => {
    if (local === value) return
    if (local.length > 0 && local.length < minLength) return

    const t = setTimeout(() => onChange(local), delay)
    return () => clearTimeout(t)
  }, [local, delay, minLength, onChange, value])

  return (
    <TextInput
      value={local}
      onChange={(event) => setLocal(event.currentTarget.value)}
      placeholder={placeholder}
      leftSection="🔍"
      rightSection={
        local ? (
          <CloseButton
            size="sm"
            onClick={() => setLocal('')}
            aria-label="Очистить поиск"
          />
        ) : null
      }
    />
  )
}

export default SearchInput

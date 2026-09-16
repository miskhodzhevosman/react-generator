// components/SearchInput.jsx
import './css/SearchInput.css'

import { useEffect, useState } from 'react'

function SearchInput({ value, onChange, placeholder = 'Поиск...', delay = 400, minLength = 3 }) {
  const [local, setLocal] = useState(value ?? '')

  // синхронизация при внешнем сбросе
  useEffect(() => { setLocal(value ?? '') }, [value])

  useEffect(() => {
    if (local === value) return
    if (local.length > 0 && local.length < minLength) return  // ждём минимум символов

    const t = setTimeout(() => onChange(local), delay)
    return () => clearTimeout(t)
  }, [local, delay, minLength, onChange, value])

  return (
    <input
      className="search-input"
      value={local}
      onChange={(e) => setLocal(e.target.value)}
      placeholder={placeholder}
    />
  )
}
export default SearchInput

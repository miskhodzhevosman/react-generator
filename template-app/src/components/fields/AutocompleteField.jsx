import {
  useEffect,
  useState,
} from 'react'

function AutocompleteField({
  field,
  value,
  onChange,
  dataSource,
}) {
  const [search, setSearch] = useState('')
  const [options, setOptions] = useState([])
  const [loading, setLoading] = useState(false)

  const {
    valueKey,
    labelKey,
  } = field.options || {}

  const searchFn = dataSource?.search

  /*
   * ============================================================
   * Проверка dataSource
   * ============================================================
   */

  useEffect(() => {
    // Валидация dataSource без логов
  }, [
    field.name,
    dataSource,
    searchFn,
    valueKey,
    labelKey,
  ])

  /*
   * ============================================================
   * Поиск
   * ============================================================
   */

  useEffect(() => {
    if (!search.trim()) {
      setOptions([])
      return
    }

    if (!searchFn || typeof searchFn !== 'function') {
      return
    }

    let cancelled = false

    const timeout = setTimeout(async () => {
      setLoading(true)

      try {
        const results = await searchFn(search)

        if (cancelled) {
          return
        }

        if (!Array.isArray(results)) {
          setOptions([])
          return
        }

        setOptions(results)
      } catch (error) {
        if (!cancelled) {
          setOptions([])
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }, 300)

    return () => {
      cancelled = true
      clearTimeout(timeout)
    }
  }, [search, searchFn, valueKey, labelKey])

  /*
   * ============================================================
   * Ввод текста
   * ============================================================
   */

  function handleInputChange(event) {
    const newValue = event.target.value
    setSearch(newValue)
  }

  /*
   * ============================================================
   * ыбор лемента
   * ============================================================
   */

  function handleSelect(item) {
    const selectedValue = item[valueKey]
    const selectedLabel = item[labelKey]

    setSearch(selectedLabel)
    setOptions([])
    onChange(selectedValue)
  }

  return (
    <div>
      <label>
        {field.label}
      </label>

      <input
        type="text"
        value={search}
        onChange={handleInputChange}
        placeholder={field.placeholder}
      />

      {loading && (
        <div>
          🔄 Ищем "{search}"...
        </div>
      )}

      {!loading &&
        search &&
        options.length > 0 && (
          <div>
            {options.map((item) => (
              <div
                key={item[valueKey]}
                onClick={() => handleSelect(item)}
              >
                {item[labelKey]}
              </div>
            ))}
          </div>
        )}

      {!loading &&
        search &&
        options.length === 0 && (
          <div>
            Ничего не найдено
          </div>
        )}
    </div>
  )
}

export default AutocompleteField

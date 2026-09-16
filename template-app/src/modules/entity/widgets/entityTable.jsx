import { useEffect } from 'react'
import DynamicTable from '../../../components/DynamicTable.jsx'
import Pagination from '../../../components/Pagination.jsx'
import SearchInput from '../../../components/SearchInput.jsx'
import { entityTableSchema } from '../schemas.js'
import { entityStore } from '../store'

function EntityTable() {
  const {
    items, loading, error,
    page, pageSize, count, q,
    getAll, setPage, setQuery,
  } = entityStore()

  useEffect(() => { getAll() }, [getAll])

  if (error) return <div>Ошибка: {error.message}</div>

  return (
    <div className="entity-table">
      <SearchInput
        value={q}
        onChange={setQuery}
        placeholder="Поиск: название, артикул, фабрика"
      />

      <DynamicTable schema={entityTableSchema} data={items} loading={loading} />

      <Pagination
        page={page}
        pageSize={pageSize}
        total={count}
        onChange={setPage}
      />
    </div>
  )
}

export default EntityTable

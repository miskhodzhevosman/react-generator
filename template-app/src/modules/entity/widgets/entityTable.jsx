import { useEffect } from 'react'
import DynamicTable from '../../../components/DynamicTable.jsx'
import Pagination from '../../../components/Pagination.jsx'
import { entityTableSchema } from '../schemas.js'
import { entityStore } from '../store'

function EntityTable() {
  const {
    items, loading, error,
    page, pageSize, count,
    getAll, reload,
  } = entityStore()

  useEffect(() => { getAll() }, [getAll])

  if (error) return <div>Ошибка: {error.message}</div>

  return (
    <>
      <DynamicTable
        schema={entityTableSchema}
        data={items}
        loading={loading}
      />
      <Pagination
        page={page}
        pageSize={pageSize}
        total={count}
        onChange={(p) => reload({ page: p })}
      />
    </>
  )
}

export default EntityTable

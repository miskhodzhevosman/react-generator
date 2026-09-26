import { useEffect, useState } from 'react'
import DynamicTable from '../../../components/DynamicTable.jsx'
import DynamicForm from '../../../components/DynamicForm.jsx'
import Pagination from '../../../components/Pagination.jsx'
import SearchInput from '../../../components/SearchInput.jsx'
import { projectfileTableSchema, projectfileFormSchema } from '../schemas.js'
import { projectfileStore } from '../store'

function EntityTable() {
  const {
    items, loading, error,
    page, pageSize, count, q,
    getAll, setPage, setQuery,
    create, update, remove,
  } = projectfileStore()

  // null — форма закрыта
  // { mode: 'create' } — создание
  // { mode: 'edit', row } — редактирование
  const [form, setForm] = useState(null)

  useEffect(() => { getAll() }, [getAll])

  if (error) return <div>Ошибка: {error.message}</div>

  const handleDelete = async (row) => {
    if (!window.confirm(`Удалить запись #${row.id}?`)) return
    await remove(row.id)
  }

  const handleSubmit = async (values) => {
    if (!form) return

    if (form.mode === 'create') {
      await create(values)
    } else {
      await update(form.row.id, values)
    }

    setForm(null)
  }

  const isOpen = Boolean(form)
  const isEdit = form?.mode === 'edit'
  const formKey = isEdit ? form.row.id : 'create'

  return (
    <div className="projectfile-table">
      <div className="projectfile-table__toolbar">
        <SearchInput
          value={q}
          onChange={setQuery}
          placeholder="Поиск: название, артикул, фабрика"
        />
      </div>

      <DynamicTable
        schema={projectfileTableSchema}
        title='projectfile'
        data={items}
        loading={loading}
        onEdit={(row) => setForm({ mode: 'edit', row })}
        onDelete={handleDelete}
        onCreate={() => setForm({ mode: 'create' })}
      />

      <Pagination
        page={page}
        pageSize={pageSize}
        total={count}
        onChange={setPage}
      />

      {isOpen && (
        <div className="projectfile-table__modal">
          <div className="projectfile-table__modal-backdrop" onClick={() => setForm(null)} />

          <div className="projectfile-table__modal-body">
            <DynamicForm
              key={formKey}
              schema={projectfileFormSchema}
              initialValues={isEdit ? form.row : {}}
              title={isEdit ? 'Редактирование' : 'Создание'}
              description={
                isEdit
                  ? 'Измените данные и сохраните.'
                  : 'Заполните данные и создайте запись.'
              }
              onSubmit={handleSubmit}
            />

            <button
              type="button"
              className="projectfile-table__cancel"
              onClick={() => setForm(null)}
            >
              Отмена
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default EntityTable

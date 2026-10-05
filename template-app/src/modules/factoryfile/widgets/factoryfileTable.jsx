import { useEffect, useState } from 'react'
import { Modal, Stack, Button, Text } from '@mantine/core'
import DynamicTable from '../../../components/DynamicTable.jsx'
import DynamicForm from '../../../components/DynamicForm.jsx'
import Pagination from '../../../components/Pagination.jsx'
import SearchInput from '../../../components/SearchInput.jsx'
import { factoryfileTableSchema, factoryfileFormSchema } from '../schemas.js'
import { factoryfileStore } from '../store'

function EntityTable() {
  const {
    items, loading, error,
    page, pageSize, count, q,
    getAll, setPage, setQuery,
    create, update, remove,
  } = factoryfileStore()

  // null — форма закрыта
  // { mode: 'create' } — создание
  // { mode: 'edit', row } — редактирование
  const [form, setForm] = useState(null)

  useEffect(() => { getAll() }, [getAll])

  if (error) return <Text c="red">Ошибка: {error.message}</Text>

  const handleDelete = async (row) => {
    if (!window.confirm(`Удалить запись #${row.id}?`)) return
    await remove(row.id)
  }

  const handleSubmit = async (payload) => {
    if (!form) return

    // Если DynamicForm отправил FormData (из-за файловых полей) —
    // разворачиваем в объект перед отправкой в стор.
    let values = payload
    if (payload instanceof FormData) {
      values = Object.fromEntries(payload.entries())
    }

    if (form.mode === 'create') {
      await create(values)
    } else {
      await update(form.row.id, values)
    }

    setForm(null)
  }

  const isOpen = Boolean(form)
  const isEdit = form?.mode === 'edit'
  const formKey = isEdit ? `edit-${form.row.id}` : 'create'

  return (
    <>
      <Stack gap="md">
        <SearchInput
          value={q}
          onChange={setQuery}
          placeholder="Поиск: название, артикул, фабрика"
        />

        <DynamicTable
          schema={factoryfileTableSchema}
          title="factoryfile"
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
      </Stack>

      <Modal
        opened={isOpen}
        onClose={() => setForm(null)}
        title={isEdit ? 'Редактирование' : 'Создание'}
        size="lg"
        centered
      >
        {isOpen && (
          <Stack gap="md">
            <DynamicForm
              key={formKey}
              schema={factoryfileFormSchema}
              initialValues={isEdit ? form.row : {}}
              title={null}
              description={null}
              submitLabel="Сохранить"
              onSubmit={handleSubmit}
            />

            <Button
              variant="default"
              onClick={() => setForm(null)}
            >
              Отмена
            </Button>
          </Stack>
        )}
      </Modal>
    </>
  )
}

export default EntityTable

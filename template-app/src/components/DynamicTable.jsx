import './css/DynamicTable.css'

function DynamicTable({
  schema,
  data,
  loading,
  onEdit,
  onDelete,
  onCreate,
  createLabel = 'Создать',
}) {
  const hasActions = Boolean(onEdit || onDelete)
  const colSpan = schema.length + (hasActions ? 1 : 0)
  const hasToolbar = Boolean(onCreate)

  return (
    <div className="dynamic-table-wrapper">
      {hasToolbar && (
        <div className="dynamic-table__toolbar">
          <button
            type="button"
            className="dynamic-table__btn dynamic-table__btn--create"
            onClick={onCreate}
          >
            {createLabel}
          </button>
        </div>
      )}

      <div className="dynamic-table-scroll">
        <table className="dynamic-table">
          <thead>
            <tr>
              {schema.map((column) => (
                <th key={column.name}>{column.label}</th>
              ))}
              {hasActions && <th>Действия</th>}
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={colSpan}>Загрузка...</td>
              </tr>
            ) : !data || data.length === 0 ? (
              <tr>
                <td colSpan={colSpan}>Нет данных</td>
              </tr>
            ) : (
              data.map((row) => (
                <tr key={row.id}>
                  {schema.map((column) => (
                    <td key={column.name}>{row[column.name]}</td>
                  ))}

                  {hasActions && (
                    <td className="dynamic-table__actions">
                      {onEdit && (
                        <button
                          type="button"
                          className="dynamic-table__btn dynamic-table__btn--edit"
                          onClick={() => onEdit(row)}
                        >
                          Изменить
                        </button>
                      )}

                      {onDelete && (
                        <button
                          type="button"
                          className="dynamic-table__btn dynamic-table__btn--delete"
                          onClick={() => onDelete(row)}
                        >
                          Удалить
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DynamicTable

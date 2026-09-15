import './css/DynamicTable.css'

function DynamicTable({ schema, data }) {
  return (
    <div className="dynamic-table-wrapper">
      <div className="dynamic-table-scroll">
        <table className="dynamic-table">
          <thead>
            <tr>
              {schema.map((column) => (
                <th key={column.name}>
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map((row) => (
              <tr key={row.id}>
                {schema.map((column) => (
                  <td key={column.name}>
                    {row[column.name]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
export default DynamicTable

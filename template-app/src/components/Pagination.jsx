function Pagination({ page, pageSize, total, onChange }) {
  const pages = Math.ceil(total / pageSize) || 1
  if (pages <= 1) return null

  return (
    <div className="pagination">
      <button disabled={page === 1} onClick={() => onChange(page - 1)}>←</button>
      <span>{page} / {pages}</span>
      <button disabled={page === pages} onClick={() => onChange(page + 1)}>→</button>
    </div>
  )
}
export default Pagination

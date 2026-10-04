import { Pagination as MantinePagination, Center } from '@mantine/core'

function Pagination({ page, pageSize, total, onChange }) {
  const pages = Math.ceil(total / pageSize) || 1
  if (pages <= 1) return null

  return (
    <Center mt="md">
      <MantinePagination
        value={page}
        total={pages}
        onChange={onChange}
        withEdges
        siblings={1}
        boundaries={1}
      />
    </Center>
  )
}

export default Pagination

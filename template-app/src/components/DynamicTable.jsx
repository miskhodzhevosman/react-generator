import { Table, Group, Button, Loader, Text, Paper, Center } from '@mantine/core'

function DynamicTable({
  schema,
  data,
  loading,
  onEdit,
  onDelete,
  onCreate,
  createLabel = 'Создать',
  title,
}) {
  const hasActions = Boolean(onEdit || onDelete)
  const colSpan = schema.length + (hasActions ? 1 : 0)
  const hasToolbar = Boolean(onCreate) || Boolean(title)

  return (
    <Paper shadow="sm" p="md" radius="md" withBorder>
      {hasToolbar && (
        <Group justify="space-between" mb="md">
          {title && (
            <Text size="lg" fw={600}>
              {title}
            </Text>
          )}
          {onCreate && (
            <Button onClick={onCreate} variant="filled">
              {createLabel}
            </Button>
          )}
        </Group>
      )}

      <Table.ScrollContainer minWidth={500}>
        <Table striped highlightOnHover withTableBorder>
          <Table.Thead>
            <Table.Tr>
              {schema.map((column) => (
                <Table.Th key={column.name}>{column.label}</Table.Th>
              ))}
              {hasActions && <Table.Th>Действия</Table.Th>}
            </Table.Tr>
          </Table.Thead>

          <Table.Tbody>
            {loading ? (
              <Table.Tr>
                <Table.Td colSpan={colSpan}>
                  <Center py="md">
                    <Loader size="sm" />
                  </Center>
                </Table.Td>
              </Table.Tr>
            ) : !data || data.length === 0 ? (
              <Table.Tr>
                <Table.Td colSpan={colSpan}>
                  <Text ta="center" c="dimmed" py="md">
                    Нет данных
                  </Text>
                </Table.Td>
              </Table.Tr>
            ) : (
              data.map((row) => (
                <Table.Tr key={row.id}>
                  {schema.map((column) => (
                    <Table.Td key={column.name}>{row[column.name]}</Table.Td>
                  ))}

                  {hasActions && (
                    <Table.Td>
                      <Group gap="xs">
                        {onEdit && (
                          <Button
                            size="xs"
                            variant="light"
                            onClick={() => onEdit(row)}
                          >
                            Изменить
                          </Button>
                        )}
                        {onDelete && (
                          <Button
                            size="xs"
                            variant="light"
                            color="red"
                            onClick={() => onDelete(row)}
                          >
                            Удалить
                          </Button>
                        )}
                      </Group>
                    </Table.Td>
                  )}
                </Table.Tr>
              ))
            )}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </Paper>
  )
}

export default DynamicTable

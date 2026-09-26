export const projectFormSchema = [
  {
    name: 'name',
    type: 'text',
    label: 'name',
    placeholder: 'Введите name',
  },
  {
    name: 'hash_id',
    type: 'text',
    label: 'Hash ID',
    placeholder: 'Введите Hash ID',
  },
  {
    name: 'client',
    type: 'int',
    label: 'client',
    placeholder: 'Введите id',
  },
  {
    name: 'tech_manager',
    type: 'int',
    label: 'tech manager',
    placeholder: 'Введите id',
  },
  {
    name: 'location',
    type: 'int',
    label: 'Локация',
    placeholder: 'Введите id',
  },
  {
    name: 'created_at',
    type: 'date',
    label: 'created at',
    placeholder: 'Введите created at',
  },
  {
    name: 'status',
    type: 'int',
    label: 'status',
    placeholder: 'Введите id',
  },
]


export const projectTableSchema = [
  {
    name: 'id',
    label: 'ID',
  },
  {
    name: 'name',
    label: 'name',
  },
  {
    name: 'hash_id',
    label: 'Hash ID',
  },
  {
    name: 'client',
    label: 'client',
  },
  {
    name: 'tech_manager',
    label: 'tech manager',
  },
  {
    name: 'location',
    label: 'Локация',
  },
  {
    name: 'created_at',
    label: 'created at',
  },
  {
    name: 'updated_at',
    label: 'updated at',
  },
  {
    name: 'status',
    label: 'status',
  },
]

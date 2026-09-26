export const historicalprojectFormSchema = [
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
    name: 'created_at',
    type: 'date',
    label: 'created at',
    placeholder: 'Введите created at',
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
    name: 'status',
    type: 'int',
    label: 'status',
    placeholder: 'Введите id',
  },
  {
    name: 'history_id',
    type: 'text',
    label: 'history id',
    placeholder: 'Введите history id',
  },
  {
    name: 'history_date',
    type: 'datetime',
    label: 'history date',
    placeholder: 'Введите history date',
  },
  {
    name: 'history_change_reason',
    type: 'text',
    label: 'history change reason',
    placeholder: 'Введите history change reason',
  },
  {
    name: 'history_type',
    type: 'select',
    label: 'history type',
    placeholder: 'Например +',
    options: [
      {
        value: '+',
        label: 'Создано',
      },
      {
        value: '~',
        label: 'Изменено',
      },
      {
        value: '-',
        label: 'Удалено',
      },
    ],
  },
  {
    name: 'history_user',
    type: 'int',
    label: 'history user',
    placeholder: 'Введите id',
  },
]


export const historicalprojectTableSchema = [
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
    name: 'created_at',
    label: 'created at',
  },
  {
    name: 'updated_at',
    label: 'updated at',
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
    name: 'status',
    label: 'status',
  },
  {
    name: 'history_id',
    label: 'history id',
  },
  {
    name: 'history_date',
    label: 'history date',
  },
  {
    name: 'history_change_reason',
    label: 'history change reason',
  },
  {
    name: 'history_type',
    label: 'history type',
  },
  {
    name: 'history_user',
    label: 'history user',
  },
]

export const historicalprojectstatusFormSchema = [
  {
    name: 'name',
    type: 'text',
    label: 'name',
    placeholder: 'Введите name',
  },
  {
    name: 'order',
    type: 'number',
    label: 'order',
    placeholder: 'Введите order',
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


export const historicalprojectstatusTableSchema = [
  {
    name: 'id',
    label: 'ID',
  },
  {
    name: 'name',
    label: 'name',
  },
  {
    name: 'order',
    label: 'order',
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

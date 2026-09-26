export const historicalcounterpartyFormSchema = [
  {
    name: 'type',
    type: 'select',
    label: 'type',
    placeholder: 'Например CLIENT',
    options: [
      {
        value: 'CLIENT',
        label: 'Client',
      },
      {
        value: 'FACTORY',
        label: 'Factory',
      },
    ],
  },
  {
    name: 'name',
    type: 'text',
    label: 'name',
    placeholder: 'Введите name',
  },
  {
    name: 'contacts',
    type: 'textarea',
    label: 'contacts',
    placeholder: 'Введите contacts',
  },
  {
    name: 'address',
    type: 'textarea',
    label: 'address',
    placeholder: 'Введите address',
  },
  {
    name: 'user',
    type: 'int',
    label: 'user',
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


export const historicalcounterpartyTableSchema = [
  {
    name: 'id',
    label: 'ID',
  },
  {
    name: 'type',
    label: 'type',
  },
  {
    name: 'name',
    label: 'name',
  },
  {
    name: 'contacts',
    label: 'contacts',
  },
  {
    name: 'address',
    label: 'address',
  },
  {
    name: 'user',
    label: 'user',
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

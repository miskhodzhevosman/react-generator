export const counterpartyFormSchema = [
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
]


export const counterpartyTableSchema = [
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
]

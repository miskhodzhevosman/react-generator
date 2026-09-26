export const financeoperationtypeFormSchema = [
  {
    name: 'name',
    type: 'text',
    label: 'name',
    placeholder: 'Введите name',
  },
  {
    name: 'code',
    type: 'select',
    label: 'code',
    placeholder: 'Например client_payment',
    options: [
      {
        value: 'client_payment',
        label: 'Client payment',
      },
      {
        value: 'factory_payment',
        label: 'Factory payment',
      },
      {
        value: 'project_expense',
        label: 'Project expense',
      },
      {
        value: 'operation_expense',
        label: 'Operation expense',
      },
    ],
  },
]


export const financeoperationtypeTableSchema = [
  {
    name: 'id',
    label: 'ID',
  },
  {
    name: 'name',
    label: 'name',
  },
  {
    name: 'code',
    label: 'code',
  },
]

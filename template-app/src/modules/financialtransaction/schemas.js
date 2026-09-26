export const financialtransactionFormSchema = [
  {
    name: 'date',
    type: 'date',
    label: 'date',
    placeholder: 'Введите date',
  },
  {
    name: 'amount',
    type: 'number',
    label: 'amount',
    placeholder: 'Введите amount',
    step: '0.01',
  },
  {
    name: 'project',
    type: 'int',
    label: 'project',
    placeholder: 'Введите id',
  },
  {
    name: 'counterparty',
    type: 'int',
    label: 'counterparty',
    placeholder: 'Введите id',
  },
  {
    name: 'finance_operation_type',
    type: 'int',
    label: 'finance operation type',
    placeholder: 'Введите id',
  },
  {
    name: 'comment',
    type: 'textarea',
    label: 'Комментарий',
    placeholder: 'Введите Комментарий',
  },
]


export const financialtransactionTableSchema = [
  {
    name: 'id',
    label: 'ID',
  },
  {
    name: 'date',
    label: 'date',
  },
  {
    name: 'amount',
    label: 'amount',
  },
  {
    name: 'project',
    label: 'project',
  },
  {
    name: 'counterparty',
    label: 'counterparty',
  },
  {
    name: 'finance_operation_type',
    label: 'finance operation type',
  },
  {
    name: 'comment',
    label: 'Комментарий',
  },
]

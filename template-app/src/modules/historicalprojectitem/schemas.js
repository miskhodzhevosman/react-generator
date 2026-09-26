export const historicalprojectitemFormSchema = [
  {
    name: 'quantity',
    type: 'number',
    label: 'quantity',
    placeholder: 'Введите quantity',
    step: '0.01',
  },
  {
    name: 'fixed_cost_price',
    type: 'number',
    label: 'fixed cost price',
    placeholder: 'Введите fixed cost price',
    step: '0.01',
  },
  {
    name: 'fixed_sale_price',
    type: 'number',
    label: 'fixed sale price',
    placeholder: 'Введите fixed sale price',
    step: '0.01',
  },
  {
    name: 'project',
    type: 'int',
    label: 'project',
    placeholder: 'Введите id',
  },
  {
    name: 'nomenclature',
    type: 'int',
    label: 'nomenclature',
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


export const historicalprojectitemTableSchema = [
  {
    name: 'id',
    label: 'ID',
  },
  {
    name: 'quantity',
    label: 'quantity',
  },
  {
    name: 'fixed_cost_price',
    label: 'fixed cost price',
  },
  {
    name: 'fixed_sale_price',
    label: 'fixed sale price',
  },
  {
    name: 'project',
    label: 'project',
  },
  {
    name: 'nomenclature',
    label: 'nomenclature',
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

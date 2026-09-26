export const projectitemFormSchema = [
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
]


export const projectitemTableSchema = [
  {
    name: 'id',
    label: 'ID',
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
]

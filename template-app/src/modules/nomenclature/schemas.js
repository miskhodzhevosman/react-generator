export const nomenclatureFormSchema = [
  {
    name: 'type',
    type: 'select',
    label: 'type',
    placeholder: 'Например PRODUCT',
    options: [
      {
        value: 'PRODUCT',
        label: 'Товар',
      },
      {
        value: 'SERVICE',
        label: 'Услуга',
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
    name: 'technical_name',
    type: 'text',
    label: 'technical name',
    placeholder: 'Введите technical name',
  },
  {
    name: 'article',
    type: 'text',
    label: 'article',
    placeholder: 'Введите article',
  },
  {
    name: 'factory',
    type: 'int',
    label: 'factory',
    placeholder: 'Введите id',
  },
  {
    name: 'current_cost_price',
    type: 'number',
    label: 'current cost price',
    placeholder: 'Введите current cost price',
    step: '0.01',
  },
  {
    name: 'current_sale_price',
    type: 'number',
    label: 'current sale price',
    placeholder: 'Введите current sale price',
    step: '0.01',
  },
  {
    name: 'created_at',
    type: 'datetime',
    label: 'created at',
    placeholder: 'Введите created at',
  },
]


export const nomenclatureTableSchema = [
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
    name: 'technical_name',
    label: 'technical name',
  },
  {
    name: 'article',
    label: 'article',
  },
  {
    name: 'factory',
    label: 'factory',
  },
  {
    name: 'current_cost_price',
    label: 'current cost price',
  },
  {
    name: 'current_sale_price',
    label: 'current sale price',
  },
  {
    name: 'created_at',
    label: 'created at',
  },
]

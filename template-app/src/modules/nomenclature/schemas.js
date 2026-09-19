export const nomenclatureFormSchema = [
  {
    name: 'type',
    type: 'text',
    label: 'Тип',
    placeholder: 'Например PRODUCT',
  },

  {
    name: 'name',
    type: 'text',
    label: 'Название',
    placeholder: 'Введите название',
  },

  {
    name: 'technical_name',
    type: 'text',
    label: 'Техническое название',
    placeholder: 'Введите техническое название',
  },

  {
    name: 'article',
    type: 'text',
    label: 'Артикул',
    placeholder: 'Введите артикул',
  },

  {
    name: 'current_cost_price',
    type: 'number',
    label: 'Себестоимость',
    placeholder: 'Введите себестоимость',
  },

  {
    name: 'current_sale_price',
    type: 'number',
    label: 'Цена продажи',
    placeholder: 'Введите цену продажи',
  },
]


export const nomenclatureTableSchema = [
  {
    name: 'id',
    label: 'id',
  },
  {
    name: 'name',
    label: 'Название',
  },
  {
    name: 'article',
    label: 'Артикул',
  },
  {
    name: 'current_cost_price',
    label: 'Себестоимость',
  },
  {
    name: 'current_sale_price',
    label: 'Цена продажи',
  },
]

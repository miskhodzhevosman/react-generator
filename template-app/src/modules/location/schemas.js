export const locationFormSchema = [
  {
    name: 'name',
    type: 'text',
    label: 'Название',
    placeholder: 'Введите Название',
  },
  {
    name: 'type',
    type: 'select',
    label: 'Тип',
    placeholder: 'Например COUNTRY',
    options: [
      {
        value: 'COUNTRY',
        label: 'Страна',
      },
      {
        value: 'REGION',
        label: 'Регион',
      },
      {
        value: 'CITY',
        label: 'Город',
      },
    ],
  },
  {
    name: 'parent',
    type: 'int',
    label: 'Родительская локация',
    placeholder: 'Введите id',
  },
]


export const locationTableSchema = [
  {
    name: 'id',
    label: 'ID',
  },
  {
    name: 'name',
    label: 'Название',
  },
  {
    name: 'type',
    label: 'Тип',
  },
  {
    name: 'parent',
    label: 'Родительская локация',
  },
]

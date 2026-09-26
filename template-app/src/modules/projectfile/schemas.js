export const projectfileFormSchema = [
  {
    name: 'project',
    type: 'int',
    label: 'Проект',
    placeholder: 'Введите id',
  },
  {
    name: 'file',
    type: 'text',
    label: 'Файл',
    placeholder: 'Введите Файл',
  },
  {
    name: 'name',
    type: 'text',
    label: 'Название',
    placeholder: 'Введите Название',
  },
  {
    name: 'description',
    type: 'textarea',
    label: 'Описание',
    placeholder: 'Введите Описание',
  },
  {
    name: 'uploaded_at',
    type: 'datetime',
    label: 'Дата загрузки',
    placeholder: 'Введите Дата загрузки',
  },
  {
    name: 'uploaded_by',
    type: 'int',
    label: 'Загрузил',
    placeholder: 'Введите id',
  },
]


export const projectfileTableSchema = [
  {
    name: 'id',
    label: 'ID',
  },
  {
    name: 'project',
    label: 'Проект',
  },
  {
    name: 'file',
    label: 'Файл',
  },
  {
    name: 'name',
    label: 'Название',
  },
  {
    name: 'description',
    label: 'Описание',
  },
  {
    name: 'uploaded_at',
    label: 'Дата загрузки',
  },
  {
    name: 'uploaded_by',
    label: 'Загрузил',
  },
]

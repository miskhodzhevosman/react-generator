export const nomenclaturefileFormSchema = [
  {
    name: 'nomenclature',
    type: 'int',
    label: 'Номенклатура',
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
    label: 'Название файла',
    placeholder: 'Введите Название файла',
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
    name: 'size',
    type: 'number',
    label: 'Размер файла (байты)',
    placeholder: 'Введите Размер файла (байты)',
  },
]


export const nomenclaturefileTableSchema = [
  {
    name: 'id',
    label: 'ID',
  },
  {
    name: 'nomenclature',
    label: 'Номенклатура',
  },
  {
    name: 'file',
    label: 'Файл',
  },
  {
    name: 'name',
    label: 'Название файла',
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
    name: 'size',
    label: 'Размер файла (байты)',
  },
]

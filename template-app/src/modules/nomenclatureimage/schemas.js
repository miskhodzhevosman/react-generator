export const nomenclatureimageFormSchema = [
  {
    name: 'nomenclature',
    type: 'int',
    label: 'Номенклатура',
    placeholder: 'Введите id',
  },
  {
    name: 'image',
    type: 'text',
    label: 'Изображение',
    placeholder: 'Введите Изображение',
  },
  {
    name: 'is_main',
    type: 'checkbox',
    label: 'Основное изображение',
    placeholder: 'Введите Основное изображение',
  },
  {
    name: 'alt_text',
    type: 'text',
    label: 'Альтернативный текст',
    placeholder: 'Введите Альтернативный текст',
  },
  {
    name: 'order',
    type: 'number',
    label: 'Порядок сортировки',
    placeholder: 'Введите Порядок сортировки',
  },
  {
    name: 'uploaded_at',
    type: 'datetime',
    label: 'Дата загрузки',
    placeholder: 'Введите Дата загрузки',
  },
]


export const nomenclatureimageTableSchema = [
  {
    name: 'id',
    label: 'ID',
  },
  {
    name: 'nomenclature',
    label: 'Номенклатура',
  },
  {
    name: 'image',
    label: 'Изображение',
  },
  {
    name: 'is_main',
    label: 'Основное изображение',
  },
  {
    name: 'alt_text',
    label: 'Альтернативный текст',
  },
  {
    name: 'order',
    label: 'Порядок сортировки',
  },
  {
    name: 'uploaded_at',
    label: 'Дата загрузки',
  },
]

import DynamicForm from '../../../components/DynamicForm.jsx'

import {
  nomenclatureimageFormSchema,
} from '../schemas.js'


import {
  nomenclatureimageStore,
} from '../store'

function nomenclatureimageForm() {

  const create =
    nomenclatureimageStore(
      (state) => state.create
    )

  async function handleSubmit(values) {
    try {
      await create(values)

      console.log('Сущность nomenclatureimage создана')
    } catch (error) {
      console.error(
        'Ошибка создания сущности nomenclatureimage:',
        error
      )
    }
  }


  return (
    <DynamicForm
      title='nomenclatureimage'
      schema={nomenclatureimageFormSchema}
      onSubmit={handleSubmit}
    />
  )
}

export default nomenclatureimageForm

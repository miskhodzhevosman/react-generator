import DynamicForm from '../../../components/DynamicForm.jsx'

import {
  nomenclatureFormSchema,
} from '../schemas.js'


import {
  nomenclatureStore,
} from '../store'

function nomenclatureForm() {

  const create =
    nomenclatureStore(
      (state) => state.create
    )

  async function handleSubmit(values) {
    try {
      await create(values)

      console.log('Сущность nomenclature создана')
    } catch (error) {
      console.error(
        'Ошибка создания сущности nomenclature:',
        error
      )
    }
  }


  return (
    <DynamicForm
      title='nomenclature'
      schema={nomenclatureFormSchema}
      onSubmit={handleSubmit}
    />
  )
}

export default nomenclatureForm

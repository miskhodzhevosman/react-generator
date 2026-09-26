import DynamicForm from '../../../components/DynamicForm.jsx'

import {
  nomenclaturefileFormSchema,
} from '../schemas.js'


import {
  nomenclaturefileStore,
} from '../store'

function nomenclaturefileForm() {

  const create =
    nomenclaturefileStore(
      (state) => state.create
    )

  async function handleSubmit(values) {
    try {
      await create(values)

      console.log('Сущность nomenclaturefile создана')
    } catch (error) {
      console.error(
        'Ошибка создания сущности nomenclaturefile:',
        error
      )
    }
  }


  return (
    <DynamicForm
      title='nomenclaturefile'
      schema={nomenclaturefileFormSchema}
      onSubmit={handleSubmit}
    />
  )
}

export default nomenclaturefileForm

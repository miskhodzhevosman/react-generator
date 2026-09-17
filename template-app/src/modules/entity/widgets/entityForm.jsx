import DynamicForm from '../../../components/DynamicForm.jsx'

import {
  entityFormSchema,
} from '../schemas.js'


import {
  entityStore,
} from '../store'

function entityForm() {

  const create =
    entityStore(
      (state) => state.create
    )

  async function handleSubmit(values) {
    try {
      await create(values)

      console.log('Сущность entity создана')
    } catch (error) {
      console.error(
        'Ошибка создания сущности entity:',
        error
      )
    }
  }


  return (
    <DynamicForm
      title='entity'
      schema={entityFormSchema}
      onSubmit={handleSubmit}
    />
  )
}

export default entityForm

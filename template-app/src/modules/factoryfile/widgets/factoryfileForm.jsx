import DynamicForm from '../../../components/DynamicForm.jsx'

import {
  factoryfileFormSchema,
} from '../schemas.js'


import {
  factoryfileStore,
} from '../store'

function factoryfileForm() {

  const create =
    factoryfileStore(
      (state) => state.create
    )

  async function handleSubmit(values) {
    try {
      await create(values)

      console.log('Сущность factoryfile создана')
    } catch (error) {
      console.error(
        'Ошибка создания сущности factoryfile:',
        error
      )
    }
  }


  return (
    <DynamicForm
      title='factoryfile'
      schema={factoryfileFormSchema}
      onSubmit={handleSubmit}
    />
  )
}

export default factoryfileForm

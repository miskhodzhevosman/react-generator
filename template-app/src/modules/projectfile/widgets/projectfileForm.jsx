import DynamicForm from '../../../components/DynamicForm.jsx'

import {
  projectfileFormSchema,
} from '../schemas.js'


import {
  projectfileStore,
} from '../store'

function projectfileForm() {

  const create =
    projectfileStore(
      (state) => state.create
    )

  async function handleSubmit(values) {
    try {
      await create(values)

      console.log('Сущность projectfile создана')
    } catch (error) {
      console.error(
        'Ошибка создания сущности projectfile:',
        error
      )
    }
  }


  return (
    <DynamicForm
      title='projectfile'
      schema={projectfileFormSchema}
      onSubmit={handleSubmit}
    />
  )
}

export default projectfileForm

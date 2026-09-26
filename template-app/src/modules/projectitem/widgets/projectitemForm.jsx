import DynamicForm from '../../../components/DynamicForm.jsx'

import {
  projectitemFormSchema,
} from '../schemas.js'


import {
  projectitemStore,
} from '../store'

function projectitemForm() {

  const create =
    projectitemStore(
      (state) => state.create
    )

  async function handleSubmit(values) {
    try {
      await create(values)

      console.log('Сущность projectitem создана')
    } catch (error) {
      console.error(
        'Ошибка создания сущности projectitem:',
        error
      )
    }
  }


  return (
    <DynamicForm
      title='projectitem'
      schema={projectitemFormSchema}
      onSubmit={handleSubmit}
    />
  )
}

export default projectitemForm

import DynamicForm from '../../../components/DynamicForm.jsx'

import {
  projectFormSchema,
} from '../schemas.js'


import {
  projectStore,
} from '../store'

function projectForm() {

  const create =
    projectStore(
      (state) => state.create
    )

  async function handleSubmit(values) {
    try {
      await create(values)

      console.log('Сущность project создана')
    } catch (error) {
      console.error(
        'Ошибка создания сущности project:',
        error
      )
    }
  }


  return (
    <DynamicForm
      title='project'
      schema={projectFormSchema}
      onSubmit={handleSubmit}
    />
  )
}

export default projectForm

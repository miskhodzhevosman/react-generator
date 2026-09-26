import DynamicForm from '../../../components/DynamicForm.jsx'

import {
  projectstatusFormSchema,
} from '../schemas.js'


import {
  projectstatusStore,
} from '../store'

function projectstatusForm() {

  const create =
    projectstatusStore(
      (state) => state.create
    )

  async function handleSubmit(values) {
    try {
      await create(values)

      console.log('Сущность projectstatus создана')
    } catch (error) {
      console.error(
        'Ошибка создания сущности projectstatus:',
        error
      )
    }
  }


  return (
    <DynamicForm
      title='projectstatus'
      schema={projectstatusFormSchema}
      onSubmit={handleSubmit}
    />
  )
}

export default projectstatusForm

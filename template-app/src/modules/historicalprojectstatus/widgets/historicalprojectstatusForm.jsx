import DynamicForm from '../../../components/DynamicForm.jsx'

import {
  historicalprojectstatusFormSchema,
} from '../schemas.js'


import {
  historicalprojectstatusStore,
} from '../store'

function historicalprojectstatusForm() {

  const create =
    historicalprojectstatusStore(
      (state) => state.create
    )

  async function handleSubmit(values) {
    try {
      await create(values)

      console.log('Сущность historicalprojectstatus создана')
    } catch (error) {
      console.error(
        'Ошибка создания сущности historicalprojectstatus:',
        error
      )
    }
  }


  return (
    <DynamicForm
      title='historicalprojectstatus'
      schema={historicalprojectstatusFormSchema}
      onSubmit={handleSubmit}
    />
  )
}

export default historicalprojectstatusForm

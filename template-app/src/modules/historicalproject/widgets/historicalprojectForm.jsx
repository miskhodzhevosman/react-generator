import DynamicForm from '../../../components/DynamicForm.jsx'

import {
  historicalprojectFormSchema,
} from '../schemas.js'


import {
  historicalprojectStore,
} from '../store'

function historicalprojectForm() {

  const create =
    historicalprojectStore(
      (state) => state.create
    )

  async function handleSubmit(values) {
    try {
      await create(values)

      console.log('Сущность historicalproject создана')
    } catch (error) {
      console.error(
        'Ошибка создания сущности historicalproject:',
        error
      )
    }
  }


  return (
    <DynamicForm
      title='historicalproject'
      schema={historicalprojectFormSchema}
      onSubmit={handleSubmit}
    />
  )
}

export default historicalprojectForm

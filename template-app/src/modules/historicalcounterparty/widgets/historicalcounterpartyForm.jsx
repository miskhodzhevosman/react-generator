import DynamicForm from '../../../components/DynamicForm.jsx'

import {
  historicalcounterpartyFormSchema,
} from '../schemas.js'


import {
  historicalcounterpartyStore,
} from '../store'

function historicalcounterpartyForm() {

  const create =
    historicalcounterpartyStore(
      (state) => state.create
    )

  async function handleSubmit(values) {
    try {
      await create(values)

      console.log('Сущность historicalcounterparty создана')
    } catch (error) {
      console.error(
        'Ошибка создания сущности historicalcounterparty:',
        error
      )
    }
  }


  return (
    <DynamicForm
      title='historicalcounterparty'
      schema={historicalcounterpartyFormSchema}
      onSubmit={handleSubmit}
    />
  )
}

export default historicalcounterpartyForm

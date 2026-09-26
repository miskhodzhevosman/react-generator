import DynamicForm from '../../../components/DynamicForm.jsx'

import {
  counterpartyFormSchema,
} from '../schemas.js'


import {
  counterpartyStore,
} from '../store'

function counterpartyForm() {

  const create =
    counterpartyStore(
      (state) => state.create
    )

  async function handleSubmit(values) {
    try {
      await create(values)

      console.log('Сущность counterparty создана')
    } catch (error) {
      console.error(
        'Ошибка создания сущности counterparty:',
        error
      )
    }
  }


  return (
    <DynamicForm
      title='counterparty'
      schema={counterpartyFormSchema}
      onSubmit={handleSubmit}
    />
  )
}

export default counterpartyForm

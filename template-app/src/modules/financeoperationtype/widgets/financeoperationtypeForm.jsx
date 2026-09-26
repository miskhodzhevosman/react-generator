import DynamicForm from '../../../components/DynamicForm.jsx'

import {
  financeoperationtypeFormSchema,
} from '../schemas.js'


import {
  financeoperationtypeStore,
} from '../store'

function financeoperationtypeForm() {

  const create =
    financeoperationtypeStore(
      (state) => state.create
    )

  async function handleSubmit(values) {
    try {
      await create(values)

      console.log('Сущность financeoperationtype создана')
    } catch (error) {
      console.error(
        'Ошибка создания сущности financeoperationtype:',
        error
      )
    }
  }


  return (
    <DynamicForm
      title='financeoperationtype'
      schema={financeoperationtypeFormSchema}
      onSubmit={handleSubmit}
    />
  )
}

export default financeoperationtypeForm

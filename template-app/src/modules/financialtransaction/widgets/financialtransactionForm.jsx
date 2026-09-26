import DynamicForm from '../../../components/DynamicForm.jsx'

import {
  financialtransactionFormSchema,
} from '../schemas.js'


import {
  financialtransactionStore,
} from '../store'

function financialtransactionForm() {

  const create =
    financialtransactionStore(
      (state) => state.create
    )

  async function handleSubmit(values) {
    try {
      await create(values)

      console.log('Сущность financialtransaction создана')
    } catch (error) {
      console.error(
        'Ошибка создания сущности financialtransaction:',
        error
      )
    }
  }


  return (
    <DynamicForm
      title='financialtransaction'
      schema={financialtransactionFormSchema}
      onSubmit={handleSubmit}
    />
  )
}

export default financialtransactionForm

import DynamicForm from '../../../components/DynamicForm.jsx'

import {
  historicalprojectitemFormSchema,
} from '../schemas.js'


import {
  historicalprojectitemStore,
} from '../store'

function historicalprojectitemForm() {

  const create =
    historicalprojectitemStore(
      (state) => state.create
    )

  async function handleSubmit(values) {
    try {
      await create(values)

      console.log('Сущность historicalprojectitem создана')
    } catch (error) {
      console.error(
        'Ошибка создания сущности historicalprojectitem:',
        error
      )
    }
  }


  return (
    <DynamicForm
      title='historicalprojectitem'
      schema={historicalprojectitemFormSchema}
      onSubmit={handleSubmit}
    />
  )
}

export default historicalprojectitemForm

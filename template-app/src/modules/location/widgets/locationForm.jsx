import DynamicForm from '../../../components/DynamicForm.jsx'

import {
  locationFormSchema,
} from '../schemas.js'


import {
  locationStore,
} from '../store'

function locationForm() {

  const create =
    locationStore(
      (state) => state.create
    )

  async function handleSubmit(values) {
    try {
      await create(values)

      console.log('Сущность location создана')
    } catch (error) {
      console.error(
        'Ошибка создания сущности location:',
        error
      )
    }
  }


  return (
    <DynamicForm
      title='location'
      schema={locationFormSchema}
      onSubmit={handleSubmit}
    />
  )
}

export default locationForm

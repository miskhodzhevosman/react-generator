import { create } from 'zustand'

export const createCrudStore = (api) =>
  create((set, get) => ({
    items: [],
    item: null,

    loading: false,
    loaded: false,
    error: null,

    // пагинация
    page: 1,
    pageSize: 20,
    count: 0,

    getAll: async (params = {}) => {
      const { page = get().page, ...rest } = params

      set({ loading: true, error: null })

      try {
        const { data } = await api.getAll({ page, ...rest })

        set({
          items: data.results ?? data,
          count: data.count ?? data.length,
          page,
          loading: false,
          loaded: true,
        })

        return data.results ?? data
      } catch (error) {
        set({ error, loading: false })
        throw error
      }
    },

    // принудительный рефетч (для смены страницы / поиска)
    reload: async (params = {}) => {
      set({ loaded: false })
      return get().getAll(params)
    },

    // ... getOne, create, update, remove — без изменений

    reset: () =>
      set({
        items: [],
        item: null,
        loaded: false,
        error: null,
        page: 1,
        count: 0,
      }),
  }))

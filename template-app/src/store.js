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
    pageSize: 10,
    count: 0,

    q: '',

    
    getAll: async (params = {}) => {
      const {
        page = get().page,
        q = get().q,
        ...rest
      } = params

      set({ loading: true, error: null })

      try {
        const { data } = await api.getAll({ page, q, ...rest })

        set({
          items: data.results ?? data,
          count: data.count ?? data.length,
          page,
          q,
          loading: false,
          loaded: true,
        })

        return data.results ?? data
      } catch (error) {
        set({ error, loading: false })
        throw error
      }
    },

    reload: async (params = {}) => {
      set({ loaded: false })
      return get().getAll(params)
    },

    // смена страницы
    setPage: (page) => get().reload({ page }),

    // поиск с сбросом на 1-ю страницу
    setQuery: (q) => get().reload({ q, page: 1 }),

    reset: () =>
      set({
        items: [], item: null,
        loaded: false, error: null,
        page: 1, count: 0, q: '',
      }),
  }))

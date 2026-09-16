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

    // поиск
    q: '',

    // ─────────── READ (список) ───────────
    getAll: async (params = {}) => {
      const { page = get().page, q = get().q, ...rest } = params

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
    remove: async (id) => {
  set({ loading: true, error: null })
  try {
    await api.remove(id)
    set({ loading: false })
    return get().reload()
  } catch (error) {
    set({ error, loading: false })
    throw error
  }
},

    // принудительный рефетч (сбрасывает loaded)
    reload: async (params = {}) => {
      set({ loaded: false })
      return get().getAll(params)
    },

    // ─────────── READ (один) ───────────
    getOne: async (id) => {
      set({ loading: true, error: null })
      try {
        const { data } = await api.getOne(id)
        set({ item: data, loading: false })
        return data
      } catch (error) {
        set({ error, loading: false })
        throw error
      }
    },

    // ─────────── CREATE ───────────
    create: async (data) => {
      set({ loading: true, error: null })
      try {
        const { data: created } = await api.create(data)

        // если мы на 1-й странице без поиска — можно добавить локально,
        // иначе корректнее перезапросить список
        if (get().page === 1 && !get().q) {
          set((state) => ({
            items: [created, ...state.items],
            count: state.count + 1,
            loading: false,
          }))
        } else {
          await get().reload({ page: 1 })
        }

        return created
      } catch (error) {
        set({ error, loading: false })
        throw error
      }
    },

    // ─────────── UPDATE ───────────
    update: async (id, data) => {
      set({ loading: true, error: null })
      try {
        const { data: updated } = await api.update(id, data)

        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? updated : item
          ),
          item: updated,
          loading: false,
        }))

        return updated
      } catch (error) {
        set({ error, loading: false })
        throw error
      }
    },

    // ─────────── DELETE ───────────
    remove: async (id) => {
      set({ loading: true, error: null })
      try {
        await api.remove(id)

        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
          count: Math.max(0, state.count - 1),
          loading: false,
        }))

        // если страница опустела — вернуться на предыдущую
        if (get().items.length === 0 && get().page > 1) {
          await get().reload({ page: get().page - 1 })
        }
      } catch (error) {
        set({ error, loading: false })
        throw error
      }
    },

    // ─────────── PAGE / SEARCH ───────────
    setPage: (page) => get().reload({ page }),
    setQuery: (q) => get().reload({ q, page: 1 }),

    // ─────────── UTILS ───────────
    clearError: () => set({ error: null }),
    clearItem: () => set({ item: null }),

    reset: () =>
      set({
        items: [],
        item: null,
        loaded: false,
        error: null,
        page: 1,
        count: 0,
        q: '',
      }),
  }))

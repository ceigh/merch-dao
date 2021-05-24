import { mutationTree, actionTree } from 'typed-vuex'
import type { Options, Item } from '../../types'
import type { Create, Update, Delete } from '../../types/api/items'

export const state = () => ({
  all: [] as Item[],
  current: {} as Item
})

export const mutations = mutationTree(state, {
  setAll (state, all: Item[]) {
    state.all = all
  },
  setCurrent (state, item: Item) {
    state.current = item
  }
})

export const actions = actionTree({ state, mutations }, {
  async create (_, data: Create.I): Promise<void> {
    await this.$axios.post('/items/create', data)
    await this.app.$accessor.items.getAll()
  },

  async update (_, data: Update.I): Promise<void> {
    await this.$axios.patch(`/item/${data.id}`, {
      item: data.item
    })
    await this.app.$accessor.items.getAll()
  },

  async deleteItem (_, data: Delete.I): Promise<void> {
    await this.$axios.delete(`/item/${data.id}`)
    await this.app.$accessor.items.getAll()
  },

  async getAll (): Promise<void> {
    const { data: { items } } = await this.$axios.get('/items')
    this.app.$accessor.items.setAll(items)
  },

  async getCurrent (): Promise<void> {
    const { $accessor } = this.app
    const id = $accessor.options.currentItem
    const { data } = await this.$axios.get(`/item/${id}`)
    $accessor.items.setCurrent(data)
  },

  async updateCurrent (_, id: Options['currentItem']): Promise<void> {
    const { $accessor } = this.app
    await $accessor.updateOptions({
      scope: $accessor.options.scope,
      options: { currentItem: id }
    })
  }
})

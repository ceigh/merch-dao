import { mutationTree, actionTree } from 'typed-vuex'
import type { Item } from '../../types'
import type { Create, Update, Delete } from '../../types/api/items'

export const state = () => ({
  all: [] as Item[]
})

export const mutations = mutationTree(state, {
  setAll (state, all: Item[]) {
    state.all = all
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
  }
})

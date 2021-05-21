import { mutationTree, actionTree } from 'typed-vuex'
import type { Item } from '../../types'
import type { Add, Edit, Delete } from '../../types/api/items'

export const state = () => ({
  all: [] as Item[],
  visible: [] as Item[]
})

export const mutations = mutationTree(state, {
  setAll (state, all: Item[]) {
    state.all = all
  },
  setVisible (state, visible: Item[]) {
    state.visible = visible
  }
})

export const actions = actionTree({ state, mutations }, {
  async add (_, data: Add.I): Promise<void> {
    await this.$axios.post('/items/add', data)
    await this.app.$accessor.items.getAll()
  },

  async edit (_, data: Edit.I): Promise<void> {
    await this.$axios.patch('/items', data)
    await this.app.$accessor.items.getAll()
  },

  async deleteItem (_, data: Delete.I): Promise<void> {
    await this.$axios.post('/items/delete', data)
    await this.app.$accessor.items.getAll()
  },

  async getAll (): Promise<void> {
    const { data: { items } } = await this.$axios.get('/items/all')
    this.app.$accessor.items.setAll(items)
  }
})

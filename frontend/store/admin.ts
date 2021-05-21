import { mutationTree, actionTree } from 'typed-vuex'
import type { User } from '../../types'
import type { Add } from '../../types/api/admin'

export const state = () => ({
  all: [] as User[]
})

export const mutations = mutationTree(state, {
  setAll (state, all: User[]) {
    state.all = all
  }
})

export const actions = actionTree({ state, mutations }, {
  async add (_, data: Add.I): Promise<void> {
    await this.$axios.post('/admin/add', data)
    await this.app.$accessor.admin.getAll()
  },

  async getAll (): Promise<void> {
    const { data: { users } } = await this.$axios.get('/admin/all')
    this.app.$accessor.admin.setAll(users)
  }
})

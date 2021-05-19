import { actionTree } from 'typed-vuex'
import type { Add } from '../../types/api/admin'

export const state = () => ({})

export const actions = actionTree({ state }, {
  async add (_, data: Add.I): Promise<void> {
    await this.$axios.post('/admin/add', data)
  }
})

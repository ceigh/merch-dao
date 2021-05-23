import { actionTree } from 'typed-vuex'
import type { Delete } from '../../types/api/user'

export const state = () => ({})

export const actions = actionTree({ state }, {
  async deleteUser (_, data: Delete.I): Promise<void> {
    await this.$axios.delete(`/user/${data.username}`)
  }
})

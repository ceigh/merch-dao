import { actionTree } from 'typed-vuex'
import type { UpdatePassword } from '../../types/api/auth'

export const state = () => ({})

export const actions = actionTree({ state }, {
  async updatePassword (_, data: UpdatePassword.I): Promise<void> {
    await this.$axios.patch('/auth/password', data)
  }
})

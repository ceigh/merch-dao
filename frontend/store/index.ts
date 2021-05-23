import { getAccessorType, mutationTree, actionTree } from 'typed-vuex'

// Import all your submodules
import * as auth_ from './auth_'
import * as admin from './admin'
import * as user from './user'
import * as items from './items'

import type { Options } from '../../types'
import type { Update } from '../../types/api/options'

export const state = () => ({
  options: {
    scope: 'default',
    currentItem: ''
  } as Options
})

export const mutations = mutationTree(state, {
  setOptions (state, options: Options) {
    state.options = options
  }
})

export const actions = actionTree({ state, mutations }, {
  async getOptions (): Promise<void> {
    const { $accessor } = this.app
    const { scope } = $accessor.options
    const { data } = await this.$axios.get(`/options/${scope}`)
    $accessor.setOptions(data)
  },

  async updateOptions (_, data: Update.I): Promise<void> {
    await this.$axios.patch(`/options/${data.scope}`, {
      options: data.options
    })
    await this.app.$accessor.getOptions()
  }
})

export const accessorType = getAccessorType({
  state,
  mutations,
  actions,

  modules: {
    // `auth` conflicts with nuxt/auth module
    auth_,
    admin,
    user,
    items
  }
})

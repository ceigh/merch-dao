import { getterTree, mutationTree, actionTree } from 'typed-vuex'

export const state = () => ({
  secret: ''
})

export const getters = getterTree(state, {
  isAuthorized: state => Boolean(state.secret)
})

export const mutations = mutationTree(state, {
  setSecret (state, newValue: string) {
    state.secret = newValue
  }
})

export const actions = actionTree({ state, getters, mutations }, {
  async signIn (_, body): Promise<void> {
    const { secret } = await this.$api.admin.signIn(body)
    this.app.$accessor.setSecret(secret)
  }
})

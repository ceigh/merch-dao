import { mutationTree, actionTree } from 'typed-vuex'
import type { Order } from '../../types'
import type { Update } from '../../types/api/orders'

export const state = () => ({
  all: [] as Order[]
})

export const mutations = mutationTree(state, {
  setAll (state, all: Order[]) {
    state.all = all
  }
})

export const actions = actionTree({ state, mutations }, {
  async update (_, data: Update.I): Promise<void> {
    await this.$axios.patch(`/order/${data.id}`, {
      item: data.order
    })
    await this.app.$accessor.orders.getAll()
  },

  async getAll (): Promise<void> {
    const { data: { orders } } = await this.$axios.get('/orders')
    this.app.$accessor.orders.setAll(orders)
  }
})

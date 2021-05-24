import { mutationTree, actionTree } from 'typed-vuex'
import type { Order } from '../../types'
import type { UpdateStatus } from '../../types/api/orders'

export const state = () => ({
  all: [] as Order[]
})

export const mutations = mutationTree(state, {
  setAll (state, all: Order[]) {
    state.all = all
  }
})

export const actions = actionTree({ state, mutations }, {
  async updateStatus (_, data: UpdateStatus.I): Promise<void> {
    await this.$axios.patch(`/order/${data.id}/status`, {
      status: data.status
    })
    await this.app.$accessor.orders.getAll()
  },

  async getAll (): Promise<void> {
    const { data: { orders } } = await this.$axios.get('/orders')
    this.app.$accessor.orders.setAll(orders)
  }
})

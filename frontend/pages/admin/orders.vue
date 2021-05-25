<template>
  <div>
    <b-list-group>
      <b-list-group-item
        v-for="order in orders"
        :key="order.id"
        class="d-flex flex-column align-items-start"
      >
        <div class="d-flex w-100 justify-content-between">
          <h5>
            <code>{{ order.id }}</code>

            <small class="text-muted text-capitalize">
              ({{ getStatusText(order.status) }})
            </small>
          </h5>

          <small>{{ order.quantity }} pieces</small>
        </div>

        <div class="d-flex w-100 justify-content-between">
          <p>Address: {{ order.address }}</p>

          <small>item id: <code>{{ order.item }}</code></small>
        </div>

        <p>
          Recipient: {{ Object.values(order.recipient.name).join(' ') }}
          {{ order.recipient.phone }} {{ order.recipient.email }}
        </p>

        <div class="d-flex w-100 justify-content-between">
          <div>
            <b-dropdown
              text="Update status"
              variant="primary"
            >
              <b-dropdown-item
                v-for="(v, k) in orderStatuses"
                :key="k"
                :active="k === order.status"
                class="text-capitalize"
                @click="updateOrderStatus(order, k)"
              >
                {{ v }}
              </b-dropdown-item>
            </b-dropdown>
          </div>
        </div>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { orderStatuses } from '../../../helpers/const'
import type { Order } from '../../../types'

export default Vue.extend({
  layout: 'admin-header',

  middleware: 'auth',

  data () {
    return { orderStatuses }
  },

  async fetch ({ app: { $accessor } }) {
    await $accessor.orders.getAll()
  },

  head: {
    title: 'Orders'
  },

  computed: {
    orders (): Order[] {
      return this.$accessor.orders.all
    }
  },

  methods: {
    getStatusText (statusNumber: Order['status']): string {
      return orderStatuses[statusNumber]
    },

    async updateOrderStatus (order: Order, status: Order['status']):
    Promise<void> {
      try {
        if (status !== order.status) {
          await this.$accessor.orders.updateStatus({
            id: order.id,
            status
          })
        }
        this.$toast('order status updated', 'Success', 'success')
      } catch (e) {
        this.$toast(e.response?.data)
      }
    }
  }
})
</script>

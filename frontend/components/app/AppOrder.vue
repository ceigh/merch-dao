<template>
  <b-list-group-item
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

    <div v-if="changeable" class="d-flex w-100 justify-content-between">
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
            @click="updateOrderStatus(k)"
          >
            {{ v }}
          </b-dropdown-item>
        </b-dropdown>
      </div>
    </div>
  </b-list-group-item>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { orderStatuses } from '../../../helpers/const'
import type { Order } from '../../../types'

export default Vue.extend({
  props: {
    order: {
      type: Object,
      required: true
    } as PropOptions<Order>,
    changeable: {
      type: Boolean,
      default: false
    } as PropOptions<boolean>
  },

  data () {
    return { orderStatuses }
  },

  methods: {
    getStatusText (statusNumber: Order['status']): string {
      return orderStatuses[statusNumber]
    },

    async updateOrderStatus (status: Order['status']):
    Promise<void> {
      const { order } = this
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

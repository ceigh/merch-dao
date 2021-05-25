<template>
  <div>
    <h2>Your order</h2>
    <app-order :order="order" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { orderIdLen } from '../../../helpers/const'

export default Vue.extend({
  validate ({ params: { orderId } }) {
    return orderId.length === orderIdLen
  },

  async asyncData ({ app: { $accessor }, params: { orderId } }) {
    return {
      order: await $accessor.orders.get({ id: orderId })
    }
  }
})
</script>

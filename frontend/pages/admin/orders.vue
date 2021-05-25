<template>
  <b-list-group>
    <app-order
      v-for="order in orders"
      :key="order.id"
      :order="order"
      changeable
    />
  </b-list-group>
</template>

<script lang="ts">
import Vue from 'vue'
import type { Order } from '../../../types'

export default Vue.extend({
  layout: 'admin-header',

  middleware: 'auth',

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
  }
})
</script>

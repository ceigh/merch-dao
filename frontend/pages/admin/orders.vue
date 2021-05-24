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
            {{ order.id }}
          </h5>
          <small>{{ order.quantity }} pieces</small>
        </div>

        <div class="d-flex w-100 justify-content-between">
          <p>{{ order.item }}</p>
          <small>
            {{ getStatusText(order.status) }} ({{ order.status }})
          </small>
        </div>

        <div class="d-flex w-100 justify-content-between">
          <div>
            <b-button
              variant="primary"
              class="mr-2"
              @click="showUpdateModal(order)"
            >
              Edit
            </b-button>
          </div>
        </div>
      </b-list-group-item>
    </b-list-group>

    <!-- modals -->
    <b-modal
      id="update-modal"
      title="Edit order"
      hide-footer
      @hide="resetUpdateCandidate"
    >
      <b-form @submit.prevent="updateOrder">
        <b-form-group
          label="Item"
          label-for="order-item"
        >
          <b-form-input
            id="order-item"
            v-model="updateCandidate.item"
            placeholder="id"
            autofocus
            required
          />
        </b-form-group>

        <b-form-group
          label="Quantity"
          label-for="order-quantity"
        >
          <b-form-input
            id="order-quantity"
            v-model.number="updateCandidate.quantity"
            type="range"
            min="1"
            max="500"
          />
          {{ updateCandidate.quantity }}
        </b-form-group>

        <b-button type="submit" variant="success">
          Save
        </b-button>
      </b-form>
    </b-modal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { orderStatuses } from '../../../helpers/const'
import type { Order } from '../../../types'

// @ts-expect-error
const candidate: Omit<Order, 'id'> = {
  item: '',
  quantity: 1
}

export default Vue.extend({
  layout: 'admin-header',

  middleware: 'auth',

  data () {
    return {
      updateCandidate: { ...candidate },
      updateCandidateId: ''
    }
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

    showUpdateModal (order: Order): void {
      const { id, ...orderRest } = order
      this.updateCandidate = orderRest
      this.updateCandidateId = id
      this.$bvModal.show('update-modal')
    },

    async updateOrder (): Promise<void> {
      const { updateCandidate } = this

      try {
        await this.$accessor.orders.update({
          id: this.updateCandidateId,
          order: updateCandidate
        })
        this.$bvModal.hide('update-modal')
        this.$toast('order updated', 'Success', 'success')
        this.resetUpdateCandidate()
      } catch (e) {
        this.$toast(e.response?.data)
      }
    },

    resetUpdateCandidate (): void {
      this.updateCandidate = { ...candidate }
    }
  }
})
</script>

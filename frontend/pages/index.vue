<template>
  <div
    v-if="step === 1"
    class="d-flex w-100 justify-content-between align-items-center"
  >
    <div>
      <h1>{{ item.name }}</h1>

      <p>{{ item.description }}</p>

      <b-button variant="primary" @click="step = 2">
        Buy now
      </b-button>
    </div>

    <div>
      <b-img
        v-if="item.images[0]"
        :src="item.images[0]"
        alt="image"
        class="mb-2"
        rounded
        width="300"
      />

      <div class="text-right">
        <h3>
          {{ totalQuantityFormatted }}
        </h3>
        <small v-if="item.quantity !== -1" class="text-muted">
          pcs only Limited
        </small>
      </div>
    </div>
  </div>

  <div
    v-else-if="step === 2"
    class="d-flex w-100 justify-content-between align-items-center"
  >
    <b-img
      v-if="item.images[1]"
      :src="item.images[1]"
      alt="image"
      rounded
      width="300"
    />

    <div>
      <h1>{{ item.name }}</h1>

      <p
        v-if="item.quantity !== -1"
      >
        <b-form-input
          id="quantity"
          v-model.number="order.quantity"
          type="range"
          min="1"
          :max="item.quantity"
        />
        {{ quantityFormatted }}
      </p>
      <strong v-else>
        Unlimited
      </strong>

      <p>{{ item.description }}</p>

      <b-button v-b-modal.order-modal variant="primary">
        Buy now
      </b-button>
    </div>

    <!-- modals -->
    <b-modal
      id="order-modal"
      title="Order"
      hide-footer
    >
      <b-form @submit.prevent="createOrder">
        <div class="d-flex">
          <b-form-group
            label="First name"
            label-for="first-name"
            class="mr-2"
          >
            <b-form-input
              id="first-name"
              v-model.trim="order.recipient.name.firstName"
              placeholder="John"
              autofocus
              required
            />
          </b-form-group>

          <b-form-group
            label="Last name"
            label-for="last-name"
          >
            <b-form-input
              id="last-name"
              v-model.trim="order.recipient.name.lastName"
              placeholder="Doe"
              required
            />
          </b-form-group>
        </div>

        <b-form-group
          label="Phone"
          label-for="phone"
        >
          <b-form-input
            id="phone"
            v-model.trim="order.recipient.phone"
            placeholder="+1 999-999-9999"
            required
          />
        </b-form-group>

        <b-form-group
          label="Email"
          label-for="email"
        >
          <b-form-input
            id="email"
            v-model.trim="order.recipient.email"
            placeholder="user@example.com"
            type="email"
          />
        </b-form-group>

        <b-form-group
          label="Address"
          label-for="address"
        >
          <b-form-textarea
            id="address"
            v-model.trim="order.address"
            placeholder="Address"
            required
          />
        </b-form-group>

        <b-button type="submit" variant="success">
          Proceed
        </b-button>
      </b-form>
    </b-modal>
  </div>

  <div v-else-if="step === 3">
    <h1>
      Order successfull! Your order id:
      <code>{{ orderId }}</code>
    </h1>
    You can track your order changes
    <b-link :to="`/order/${orderId}`">
      here
    </b-link>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import type { Item, Order } from '../../types'

export default Vue.extend({
  data () {
    return {
      step: 1,
      order: {
        quantity: 1,
        recipient: {
          name: {
            firstName: '',
            lastName: ''
          },
          phone: '',
          email: ''
        },
        address: ''
      } as Omit<Order, 'id' | 'status'>,
      orderId: ''
    }
  },

  async fetch ({ app: { $accessor } }) {
    if ($accessor.options.currentItem === '') {
      throw new Error('no current item')
    } else { await $accessor.items.getCurrent() }
  },

  computed: {
    item (): Item {
      return this.$accessor.items.current
    },
    totalQuantityFormatted (): string {
      const { quantity } = this.item
      return quantity === -1 ? 'Unlimited' : `${quantity}X`
    },
    quantityFormatted (): string {
      return `${this.order.quantity} PCS`
    }
  },

  methods: {
    async createOrder (): Promise<void> {
      const { order } = this
      if (!order.recipient.email) { order.recipient.email = undefined }

      try {
        const { id } = await this.$accessor.orders.create({
          ...order,
          item: this.item.id
        })
        this.orderId = id
        this.step = 3
      } catch (e) {
        this.$toast(e.response?.data)
      }
    }
  }
})
</script>

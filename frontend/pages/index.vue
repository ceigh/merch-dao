<template>
  <div>
    <p>{{ item.description }}</p>

    <b-button variant="primary">
      Buy now
    </b-button>

    <b-img :src="item.images[0]" alt="image" />

    <div>
      <p>{{ quantityFormatted }}</p>
      <p v-if="item.quantity !== -1">
        pcs only Limited
      </p>
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import type { Item } from '../../types'

export default Vue.extend({
  async fetch ({ app: { $accessor } }) {
    if ($accessor.options.currentItem === '') {
      throw new Error('no current item')
    } else { await $accessor.items.getCurrent() }
  },

  computed: {
    item (): Item {
      return this.$accessor.items.current
    },
    quantityFormatted (): string {
      const { quantity } = this.item
      return quantity === -1 ? 'Unlimited' : `${quantity}X`
    }
  }
})
</script>

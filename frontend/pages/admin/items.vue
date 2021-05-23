<template>
  <div>
    <b-list-group>
      <b-list-group-item v-b-modal.add-modal button>
        Add new item
      </b-list-group-item>

      <b-list-group-item
        v-for="item in items"
        :key="item.id"
        class="d-flex flex-column align-items-start"
      >
        <div class="d-flex w-100 justify-content-between">
          <b-form-checkbox
            :checked="item.isVisible"
            disabled
          >
            <h5>
              {{ item.name }}
            </h5>
          </b-form-checkbox>
          <small>
            {{ getFormattedQuantity(item.quantity) }}
          </small>
        </div>

        <p>{{ item.description }}</p>

        <b-button
          variant="danger"
          @click="showDeleteModal(item)"
        >
          Delete
        </b-button>
      </b-list-group-item>
    </b-list-group>

    <!-- modals -->
    <b-modal
      id="add-modal"
      title="New item"
      hide-footer
      @ok="addItem"
    >
      <b-form @submit.prevent="addItem">
        <b-form-group
          label="Name"
          label-for="add-item-name"
        >
          <b-form-input
            id="add-item-name"
            v-model="additionCandidate.name"
            placeholder="Mug"
            autofocus
            required
          />
        </b-form-group>

        <b-form-group
          label="Description"
          label-for="add-item-description"
        >
          <b-form-input
            id="add-item-description"
            v-model="additionCandidate.description"
            placeholder="Coffee mug"
            required
          />
        </b-form-group>

        <b-form-group
          label="Image"
          label-for="add-item-image"
        >
          <b-form-input
            id="add-item-image"
            v-model="additionCandidate.images[0]"
            placeholder="url"
          />
        </b-form-group>

        <b-form-group
          label="Quantity"
          label-for="add-item-quantity"
        >
          <b-form-input
            id="add-item-quantity"
            v-model.number="additionCandidate.quantity"
            type="range"
            min="-1"
            max="100"
          />
          {{ additionCandidateFormattedQuantity }}
        </b-form-group>

        <b-form-group>
          <b-form-checkbox v-model="additionCandidate.isVisible">
            Set item as visible on homepage
          </b-form-checkbox>
        </b-form-group>

        <b-button type="submit" variant="success">
          Create
        </b-button>
      </b-form>
    </b-modal>

    <b-modal
      id="delete-modal"
      title="Item deletion"
      @ok="deleteItem"
    >
      <p>
        Are you sure you want to delete the
        <strong>{{ deletetionCandidate.name }}</strong>?
      </p>
    </b-modal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import type { Item } from '../../../types'

export default Vue.extend({
  layout: 'admin-header',

  middleware: 'auth',

  data () {
    return {
      additionCandidate: {
        name: '',
        description: '',
        images: [],
        quantity: -1,
        isVisible: false
      } as Omit<Item, 'id'>,
      deletetionCandidate: {} as Item
    }
  },

  async fetch ({ app: { $accessor } }) {
    try {
      await $accessor.items.getAll()
    } catch (e) {
      this.$toast(e.response?.data)
    }
  },

  head: {
    title: 'Items'
  },

  computed: {
    items (): Item[] {
      return this.$accessor.items.all
    },
    additionCandidateFormattedQuantity (): string {
      return this.getFormattedQuantity(this.additionCandidate.quantity)
    }
  },

  methods: {
    getFormattedQuantity (quantity: number): string {
      return quantity === -1 ? 'Unlimited' : String(quantity)
    },

    async addItem (): Promise<void> {
      try {
        await this.$accessor.items.add({
          items: [this.additionCandidate]
        })
        this.$bvModal.hide('add-modal')
        this.$toast('Item added', 'Success', 'success')

        this.additionCandidate.name = ''
        this.additionCandidate.description = ''
        this.additionCandidate.quantity = -1
        this.additionCandidate.isVisible = false
      } catch (e) {
        this.$toast(e.response?.data)
      }
    },

    showDeleteModal (item: Item): void {
      this.deletetionCandidate = item
      this.$bvModal.show('delete-modal')
    },

    async deleteItem (): Promise<void> {
      try {
        await this.$accessor.items.deleteItem({
          id: this.deletetionCandidate.id
        })
        this.$toast('item removed', 'Success', 'success')
      } catch (e) {
        this.$toast(e.response?.data)
      }
      this.deletetionCandidate = {} as Item
    }
  }
})
</script>

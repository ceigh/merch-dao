<template>
  <div>
    <b-list-group>
      <b-list-group-item button class="text-center" @click="showCreateModal">
        Create new item
      </b-list-group-item>

      <b-list-group-item
        v-for="item in items"
        :key="item.id"
        class="d-flex flex-column align-items-start"
      >
        <div class="d-flex w-100 justify-content-between">
          <h5>
            {{ item.name }}
            <small v-if="currentItemId === item.id" class="text-muted">
              (current)
            </small>
          </h5>
          <small>{{ getFormattedQuantity(item.quantity) }}</small>
        </div>

        <div class="d-flex w-100 justify-content-between">
          <p>{{ item.description }}</p>
          <small>id: <code>{{ item.id }}</code></small>
        </div>

        <p v-if="item.images.length" class="h-25">
          <b-img-lazy
            v-for="(img, i) in item.images"
            :key="i"
            :src="img"
            alt="image"
            width="32"
            height="32"
            class="image"
            rounded
          />
        </p>

        <div class="d-flex w-100 justify-content-between">
          <div>
            <b-button
              variant="primary"
              class="mr-2"
              @click="showEditModal(item)"
            >
              Edit
            </b-button><b-button
              :disabled="currentItemId === item.id"
              variant="success"
              @click="makeItemCurrent(item.id)"
            >
              Make current
            </b-button>
          </div>

          <b-button
            variant="danger"
            @click="showDeleteModal(item)"
          >
            Delete
          </b-button>
        </div>
      </b-list-group-item>
    </b-list-group>

    <!-- modals -->
    <b-modal
      id="modal"
      :title="modalTitle"
      hide-footer
      @hide="resetCandidate"
    >
      <b-form @submit.prevent="modalAction">
        <b-form-group
          label="Name"
          label-for="item-name"
        >
          <b-form-input
            id="item-name"
            v-model="candidate.name"
            placeholder="Mug"
            autofocus
            required
          />
        </b-form-group>

        <b-form-group
          label="Description"
          label-for="item-description"
        >
          <b-form-textarea
            id="item-description"
            v-model="candidate.description"
            placeholder="Coffee mug"
            required
          />
        </b-form-group>

        <b-form-group
          label="Images"
        >
          <div class="d-flex gap-2">
            <b-form-input
              v-model="candidate.images[0]"
              placeholder="url"
              class="mr-2"
            />
            <b-form-input
              v-model="candidate.images[1]"
              placeholder="url"
              class="mr-2"
            />
            <b-form-input
              v-model="candidate.images[2]"
              placeholder="url"
            />
          </div>
        </b-form-group>

        <b-form-group
          label="Quantity"
          label-for="item-quantity"
        >
          <b-form-input
            id="item-quantity"
            v-model.number="candidate.quantity"
            type="range"
            min="-1"
            max="500"
          />
          {{ candidateFormattedQuantity }}
        </b-form-group>

        <b-button type="submit" variant="success">
          {{ modalSubmitText }}
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

const candidate: Omit<Item, 'id'> = {
  name: '',
  description: '',
  images: [],
  quantity: -1
}

export default Vue.extend({
  layout: 'admin-header',

  middleware: 'auth',

  data () {
    return {
      isCreate: true,
      candidate: { ...candidate },
      editionCandidateId: '',
      deletetionCandidate: {} as Item
    }
  },

  async fetch ({ app: { $accessor } }) {
    await $accessor.items.getAll()
  },

  head: {
    title: 'Items'
  },

  computed: {
    items (): Item[] {
      return this.$accessor.items.all
    },
    currentItemId (): string {
      return this.$accessor.options.currentItem
    },
    candidateFormattedQuantity (): string {
      return this.getFormattedQuantity(this.candidate.quantity)
    },
    modalSubmitText (): string {
      return this.isCreate ? 'Create' : 'Save'
    },
    modalTitle (): string {
      return this.isCreate ? 'New item' : 'Edit item'
    },
    modalAction (): Function {
      return this.isCreate ? this.createItem : this.editItem
    }
  },

  methods: {
    getFormattedQuantity (quantity: number): string {
      return quantity === -1 ? 'Unlimited' : `${quantity} pieces left`
    },

    showCreateModal (): void {
      this.isCreate = true
      this.$bvModal.show('modal')
    },
    showEditModal (item: Item): void {
      const { id, ...itemRest } = item
      this.candidate = itemRest
      this.candidate.images = [...itemRest.images]
      this.editionCandidateId = id
      this.isCreate = false
      this.$bvModal.show('modal')
    },
    showDeleteModal (item: Item): void {
      this.deletetionCandidate = item
      this.$bvModal.show('delete-modal')
    },

    async createItem (): Promise<void> {
      try {
        await this.$accessor.items.create({
          ...this.candidate
        })
        this.$bvModal.hide('modal')
        this.$toast('item created', 'Success', 'success')
        this.resetCandidate()
      } catch (e) {
        this.$toast(e.response?.data)
      }
    },

    async editItem (): Promise<void> {
      const { candidate } = this
      if (!candidate.images.some(Boolean)) { candidate.images = [] }

      try {
        await this.$accessor.items.update({
          id: this.editionCandidateId,
          item: candidate
        })
        this.$bvModal.hide('modal')
        this.$toast('item edited', 'Success', 'success')
        this.resetCandidate()
      } catch (e) {
        this.$toast(e.response?.data)
      }
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
    },

    async makeItemCurrent (id: Item['id']): Promise<void> {
      try {
        await this.$accessor.items.updateCurrent(id)
        this.$toast('current item is set', 'Success', 'success')
      } catch (e) {
        this.$toast(e.response?.data)
      }
    },

    resetCandidate (): void {
      this.candidate = { ...candidate }
      this.candidate.images = []
    }
  }
})
</script>

<style scoped>
.image:not(:last-of-type) {
  margin-right: 0.5rem;
}
</style>

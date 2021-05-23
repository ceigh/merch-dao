<template>
  <div>
    <b-list-group>
      <b-list-group-item
        v-for="admin in admins"
        :key="admin.username"
        class="d-flex justify-content-between align-items-center"
      >
        <span>
          {{ admin.username }}
          <small
            v-if="admin.username === currentAdminUsername"
            class="text-muted"
          >
            (you)
          </small>
        </span>

        <b-button
          v-if="admin.username !== currentAdminUsername"
          variant="danger"
          @click="showDeleteModal(admin.username)"
        >
          Delete
        </b-button>
      </b-list-group-item>
    </b-list-group>

    <b-modal
      id="delete-modal"
      title="Administrator deletion"
      @ok="deleteAdmin"
    >
      <p>
        Are you sure you want to delete the
        <strong>{{ deletetionCandidate }}</strong>?
      </p>
    </b-modal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import type { User } from '../../../types'

export default Vue.extend({
  layout: 'admin-header',

  middleware: 'auth',

  data () {
    return {
      deletetionCandidate: ''
    }
  },

  async fetch ({ app: { $accessor } }) {
    try {
      await $accessor.admin.getAll()
    } catch (e) {
      this.$toast(e.response?.data)
    }
  },

  head: {
    title: 'Administrators'
  },

  computed: {
    currentAdminUsername (): string {
      return this.$auth.user?.username as string ?? 'admin'
    },
    admins (): User[] {
      return this.$accessor.admin.all
    }
  },

  methods: {
    showDeleteModal (username: string): void {
      this.deletetionCandidate = username
      this.$bvModal.show('delete-modal')
    },

    async deleteAdmin (): Promise<void> {
      const { $accessor } = this
      try {
        await $accessor.user.deleteUser({
          username: this.deletetionCandidate
        })
        this.$toast('administrator removed', 'Success', 'success')
        await $accessor.admin.getAll()
      } catch (e) {
        this.$toast(e.response?.data)
      }
      this.deletetionCandidate = ''
    }
  }
})
</script>

<template>
  <div>
    <b-list-group>
      <b-list-group>
        <b-list-group-item
          v-b-modal.create-admin-modal
          class="text-center"
          button
        >
          Create new admin
        </b-list-group-item>

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

      <!-- modals -->
      <b-modal
        id="create-admin-modal"
        title="New admin"
        hide-footer
      >
        <b-form @submit.prevent="createAdmin">
          <b-form-group
            label="Username"
            label-for="create-admin-username"
          >
            <b-form-input
              id="create-admin-username"
              v-model="createAdminData.username"
              placeholder="admin"
              autofocus
              required
            />
          </b-form-group>

          <b-form-group
            label="Password"
            label-for="create-admin-password"
          >
            <b-form-input
              id="create-admin-password"
              v-model="createAdminData.password"
              placeholder="password"
              required
            />
          </b-form-group>

          <b-button type="submit" variant="success">
            Create
          </b-button>
        </b-form>
      </b-modal>

      <b-modal
        id="delete-modal"
        title="Admin deletion"
        @ok="deleteAdmin"
      >
        <p>
          Are you sure you want to delete the
          <strong>{{ deletetionCandidate }}</strong>?
        </p>
      </b-modal>
    </b-list-group>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import type { User } from '../../../types'
import type { Create as CreateAdmin } from '../../../types/api/admin'

export default Vue.extend({
  layout: 'admin-header',

  middleware: 'auth',

  data () {
    return {
      createAdminData: {
        username: '',
        password: ''
      } as CreateAdmin.I,
      deletetionCandidate: ''
    }
  },

  async fetch ({ app: { $accessor } }) {
    await $accessor.admin.getAll()
  },

  head: {
    title: 'Admins'
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

    async createAdmin (): Promise<void> {
      try {
        await this.$accessor.admin.create(this.createAdminData)

        this.$bvModal.hide('create-admin-modal')
        this.$toast('Admin created', 'Success', 'success')

        this.createAdminData.username = ''
        this.createAdminData.password = ''
      } catch (e) {
        this.$toast(e.response?.data)
      }
    },

    async deleteAdmin (): Promise<void> {
      const { $accessor } = this
      try {
        await $accessor.user.deleteUser({
          username: this.deletetionCandidate
        })
        this.$toast('admin removed', 'Success', 'success')
        await $accessor.admin.getAll()
      } catch (e) {
        this.$toast(e.response?.data)
      }
      this.deletetionCandidate = ''
    }
  }
})
</script>

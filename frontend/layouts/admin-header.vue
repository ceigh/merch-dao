<template>
  <div>
    <!-- header -->
    <b-navbar toggleable="md" sticky class="px-3">
      <b-navbar-brand to="/">
        MerchDAO
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse" />

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/admin/items" exact-active-class="active">
            Items
          </b-nav-item>

          <b-nav-item to="/admin/orders" exact-active-class="active">
            Orders
          </b-nav-item>

          <b-nav-item to="/admin/admins" exact-active-class="active">
            Admins
          </b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <template #button-content>
              <span v-if="loggedIn">{{ username }}</span>
              <span v-else>Account</span>
            </template>

            <b-dropdown-group v-if="loggedIn">
              <b-dropdown-item-button v-b-modal.update-password-modal>
                Change password
              </b-dropdown-item-button>
              <b-dropdown-item-button v-b-modal.sign-out-modal>
                Sign out
              </b-dropdown-item-button>
            </b-dropdown-group>

            <b-dropdown-item v-else to="/admin/sign-in">
              Sign in
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <!-- content -->
    <b-container>
      <nuxt />
    </b-container>

    <!-- modals -->
    <b-modal
      id="update-password-modal"
      title="Password change"
      hide-footer
    >
      <b-form @submit.prevent="updatePassword">
        <b-form-group
          label="Old password"
          label-for="update-password-old-password"
        >
          <b-form-input
            id="update-password-old-password"
            v-model="updatePasswordData.oldPassword"
            placeholder="old password"
            autofocus
            required
          />
        </b-form-group>

        <b-form-group
          label="New password"
          label-for="update-password-new-password"
        >
          <b-form-input
            id="update-password-new-password"
            v-model="updatePasswordData.newPassword"
            placeholder="new password"
            required
          />
        </b-form-group>

        <b-form-group>
          <b-form-checkbox v-model="updatePasswordData.signOut">
            Terminate all sessions
          </b-form-checkbox>
        </b-form-group>

        <b-button type="submit" variant="success">
          Save
        </b-button>
      </b-form>
    </b-modal>

    <b-modal
      id="sign-out-modal"
      title="Sign out?"
      @ok="signOut"
    >
      <b-form-checkbox v-model="signOutAllTokens">
        Terminate all sessions
      </b-form-checkbox>
    </b-modal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import type { UpdatePassword } from '../../types/api/auth'

export default Vue.extend({
  data () {
    return {
      updatePasswordData: {
        oldPassword: '',
        newPassword: '',
        signOut: false
      } as UpdatePassword.I,
      signOutAllTokens: false
    }
  },

  computed: {
    username (): string {
      return this.$auth.user?.username as string ?? 'username'
    },
    loggedIn (): boolean {
      return this.$auth.loggedIn
    }
  },

  methods: {
    async updatePassword (): Promise<void> {
      const { updatePasswordData } = this

      try {
        await this.$accessor.auth_.updatePassword(updatePasswordData)

        const { signOut } = updatePasswordData
        if (signOut) { this.signOut() }

        this.$bvModal.hide('update-password-modal')
        this.$toast('Password changed', 'Success', 'success')

        this.updatePasswordData.oldPassword = ''
        this.updatePasswordData.newPassword = ''
        this.updatePasswordData.signOut = false
      } catch (e) {
        this.$toast(e.response?.data)
      }
    },

    async signOut (): Promise<void> {
      const allTokens = this.signOutAllTokens
      const payload = allTokens ? { data: { allTokens } } : undefined

      try {
        await this.$auth.logout(payload)
      } catch (e) {
        this.$toast(e.response?.data)
      }
    }
  }
})
</script>

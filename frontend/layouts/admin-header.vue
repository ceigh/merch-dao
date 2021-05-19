<template>
  <div>
    <b-navbar toggleable="lg" sticky class="px-3">
      <b-navbar-brand to="/">
        MerchDAO
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse" />

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/admin/items">
            Товары
          </b-nav-item>
          <b-nav-item to="/admin/orders">
            Заказы
          </b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <template #button-content>
              <span v-if="loggedIn">{{ username }}</span>
              <span v-else>Аккаунт</span>
            </template>
            <b-dropdown-item v-if="loggedIn" @click="signOut">
              Выйти
            </b-dropdown-item>
            <b-dropdown-item v-else to="/admin/sign-in">
              Войти
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <b-container>
      <nuxt />
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  computed: {
    username (): string {
      return this.$auth.user?.username as string ?? 'username'
    },
    loggedIn (): boolean {
      return this.$auth.loggedIn
    }
  },

  methods: {
    async signOut (): Promise<void> {
      try {
        await this.$auth.logout()
      } catch (e) {
        this.$toast(e.response?.data)
      }
    }
  }
})
</script>

<template>
  <div>
    <b-form @submit.prevent="signIn">
      <b-form-group
        label="Username"
        label-for="username"
      >
        <b-form-input
          id="username"
          v-model="username"
          placeholder="admin"
          autofocus
          required
        />
      </b-form-group>

      <b-form-group
        label="Пароль"
        label-for="password"
      >
        <b-form-input
          id="password"
          v-model="password"
          placeholder="password"
          required
        />
      </b-form-group>

      <b-button type="submit" variant="primary">
        Войти
      </b-button>
    </b-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  layout: 'admin-header',

  data () {
    return {
      username: '',
      password: ''
    }
  },

  methods: {
    async signIn (): Promise<void> {
      try {
        await this.$accessor.admin.signIn({
          username: this.username,
          password: this.password
        })
        this.$router.push('/admin/items')
      } catch (e) {
        this.$bvToast.toast(e.message, {
          title: 'Ошибка',
          solid: true,
          toaster: 'b-toaster-bottom-right',
          variant: 'danger'
        })
      }
    }
  }
})
</script>

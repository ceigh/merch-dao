<template>
  <b-form @submit.prevent="signIn">
    <b-form-group
      label="Username"
      label-for="username"
    >
      <b-form-input
        id="username"
        v-model.trim="signInData.username"
        placeholder="admin"
        autofocus
        required
      />
    </b-form-group>

    <b-form-group
      label="Password"
      label-for="password"
    >
      <b-form-input
        id="password"
        v-model="signInData.password"
        placeholder="password"
        required
      />
    </b-form-group>

    <b-button type="submit" variant="primary">
      Sign in
    </b-button>
  </b-form>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  layout: 'admin-header',

  data () {
    return {
      signInData: {
        username: '',
        password: ''
      }
    }
  },

  head: {
    title: 'Sign in'
  },

  methods: {
    async signIn (): Promise<void> {
      try {
        await this.$auth.loginWith('local', { data: this.signInData })
      } catch (e) {
        this.$toast(e.response?.data)
      }
    }
  }
})
</script>

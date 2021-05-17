<template>
  <div>items</div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  layout: 'admin-header',

  middleware: 'admin-auth'
})
</script>

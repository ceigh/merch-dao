<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  middleware ({ redirect }) {
    redirect('/admin/items')
  }
})
</script>

import Vue from 'vue'

type Variant = 'danger' | 'warning' | 'success' | 'info'

const upperCaseFirst = (str: string): string =>
  `${str[0].toUpperCase()}${str.slice(1)}`

export function toast (
  this: Vue,
  text = 'Unknown error',
  title = 'Error',
  variant: Variant = 'danger'
): void {
  this.$root.$bvToast.toast(upperCaseFirst(text), {
    title,
    variant,
    solid: true,
    toaster: 'b-toaster-bottom-right'
  })
}

Vue.prototype.$toast = toast

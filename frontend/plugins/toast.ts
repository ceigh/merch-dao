import Vue from 'vue'

type Variant = 'danger' | 'warning' | 'success' | 'info'

const upperCaseFirst = (str: string): string =>
  `${str[0].toUpperCase()}${str.slice(1)}`

export function toast (
  this: Vue,
  text: string = 'Неизвестная ошибка',
  variant: Variant = 'danger'
): void {
  this.$root.$bvToast.toast(upperCaseFirst(text), {
    variant,
    solid: true,
    toaster: 'b-toaster-bottom-right',
    title: 'Ошибка'
  })
}

Vue.prototype.$toast = toast

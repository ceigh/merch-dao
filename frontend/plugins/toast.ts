import Vue from 'vue'

type Variant = 'danger' | 'warning' | 'success' | 'info'

export function toast (
  this: Vue,
  text: string = 'Неизвестная ошибка',
  variant: Variant = 'danger'
): void {
  this.$root.$bvToast.toast(text, {
    variant,
    solid: true,
    toaster: 'b-toaster-bottom-right',
    title: 'Ошибка'
  })
}

Vue.prototype.$toast = toast

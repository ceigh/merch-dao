import type { Plugin } from '@nuxt/types'

const initPlugin: Plugin = async ({ app: { $accessor } }) => {
  await $accessor.getOptions()
}
export default initPlugin

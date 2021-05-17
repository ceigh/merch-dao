import { accessorType } from '@/store'

type Accessor = typeof accessorType
declare module 'vue/types/vue' {
  interface Vue {
    $accessor: Accessor
  }
}
declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $accessor: Accessor
  }
}

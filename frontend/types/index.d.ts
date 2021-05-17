import { accessorType } from '@/store'

type Accessor = typeof accessorType
declare module 'vue/types/vue' {
  interface Vue {
    $accessor: Accessor
    $bvToast: { toast: Function }
  }
}
declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $accessor: Accessor
  }
}

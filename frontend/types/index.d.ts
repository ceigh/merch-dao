import { accessorType } from '@/store'
import { toast } from '@/plugins/toast'

type Accessor = typeof accessorType

declare module 'vue/types/vue' {
  interface Vue {
    $accessor: Accessor
    $bvModal: { show: Function, hide: Function }
    $bvToast: { toast: Function }
    $toast: typeof toast
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $accessor: Accessor
  }
  /*
  interface Context {
  }
  */
}

/*
declare module 'vuex/types/index' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Store<S> {
  }
}
*/

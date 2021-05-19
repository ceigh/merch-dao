import { accessorType } from '@/store'
import { toast } from '@/plugins/toast'
import type { NuxtAxiosInstance } from '@nuxtjs/axios'

type Accessor = typeof accessorType
type Api = NuxtAxiosInstance

declare module 'vue/types/vue' {
  interface Vue {
    $accessor: Accessor
    $api: Api
    $bvModal: { show: Function, hide: Function }
    $bvToast: { toast: Function }
    $toast: typeof toast
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $accessor: Accessor
    $api: Api
  }
  interface Context {
    $api: Api
  }
}

declare module 'vuex/types/index' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Store<S> {
    $api: Api
  }
}

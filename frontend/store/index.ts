import { getAccessorType } from 'typed-vuex'

// Import all your submodules
import * as auth from '@/store/auth'

export const accessorType = getAccessorType({
  modules: {
    auth
  }
})

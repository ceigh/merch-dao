import { getAccessorType } from 'typed-vuex'

// Import all your submodules
import * as admin from '@/store/admin'

export const accessorType = getAccessorType({
  modules: {
    admin
  }
})

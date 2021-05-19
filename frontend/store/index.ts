import { getAccessorType } from 'typed-vuex'

// Import all your submodules
import * as auth_ from './auth_'
import * as admin from './admin'

export const accessorType = getAccessorType({
  modules: {
    // `auth` conflicts with nuxt/auth module
    auth_,
    admin
  }
})

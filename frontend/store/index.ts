import { getAccessorType } from 'typed-vuex'

// Import all your submodules
import * as auth from './auth'
import * as admin from './admin'

export const accessorType = getAccessorType({
  modules: {
    // `auth` conflicts with nuxt/auth module
    _auth: auth,
    admin
  }
})

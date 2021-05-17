import { createCall } from '.'
import type * as admin from '../../../types/api/admin'

const call = createCall('admin')

export default {
  // TODO: add auth header
  async add (body: admin.AddAdmin.I) {
    return await call({ fn: 'add', body })
  },

  async signIn (body: admin.SignIn.I) {
    return await call<admin.SignIn.O>({ fn: 'sign-in', body })
  },

  async signOut (body: admin.SignOut.I) {
    return await call({ fn: 'sign-out', body })
  },

  // TODO: add auth header
  async updatePassword (body: admin.UpdatePassword.I) {
    return await call({ fn: 'password', method: 'PATCH', body })
  }
}

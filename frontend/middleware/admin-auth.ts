import type { Middleware } from '@nuxt/types'

const authMiddleware: Middleware = ({ app: { $accessor }, redirect }) => {
  if (!$accessor.auth.isAuthorized) { redirect('/admin/sign-in') }
}

export default authMiddleware

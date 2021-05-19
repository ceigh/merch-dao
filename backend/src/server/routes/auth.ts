import Router from 'koa-router'
import { createRoute } from '../../helpers/server'
import * as m from '../../db/api/auth'
import * as v from '../../helpers/validators/auth'

const router = new Router({ prefix: '/auth' })

router.post('/sign-in', createRoute({
  method: m.signIn,
  validator: v.getSignInErr,
  ok: 202
}))

router.post('/sign-out', createRoute({
  method: m.signOut,
  validator: v.getSignOutErr,
  secure: true
}))

router.patch('/password', createRoute({
  method: m.updatePassword,
  validator: v.getUpdatePasswordErr,
  ok: 202,
  secure: true
}))

export default router

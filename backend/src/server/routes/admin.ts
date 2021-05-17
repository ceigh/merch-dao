import Router from 'koa-router'
import { createRoute } from '../../helpers/server'
import * as m from '../../db/api/admin'
import * as v from '../../helpers/validators/admin'

const router = new Router({ prefix: '/admin' })

router.post('/add', createRoute({
  method: m.addAdmin,
  validator: v.getAddAdminErr,
  ok: 201,
  secure: true
}))

router.post('/sign-in', createRoute({
  method: m.signIn,
  validator: v.getSignInErr
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

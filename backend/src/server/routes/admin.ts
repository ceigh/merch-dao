import Router from 'koa-router'
import { createRoute } from '../../helpers/server'
import * as m from '../../db/api/admin'
import * as v from '../../helpers/validators/admin'

const router = new Router({ prefix: '/admin' })

router.post('/add', createRoute({
  method: m.add,
  validator: v.getAddErr,
  ok: 201,
  secure: true
}))

export default router

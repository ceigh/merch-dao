import Router from 'koa-router'
import { createRoute } from '../../helpers/server'
import * as m from '../../db/api/admin'
import * as v from '../../helpers/validators/admin'

const router = new Router({ prefix: '/admins' })

router.post('/create', createRoute({
  method: m.create,
  validator: v.getCreateErr,
  ok: 201,
  secure: true
}))

router.get('/', createRoute({
  method: m.getAll,
  secure: true
}))

export default router

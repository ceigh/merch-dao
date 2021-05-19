import Router from 'koa-router'
import { createRoute } from '../../helpers/server'
import * as m from '../../db/api/items'
import * as v from '../../helpers/validators/items'

const router = new Router({ prefix: '/items' })

router.post('/add', createRoute({
  method: m.add,
  validator: v.getAddErr,
  ok: 201,
  secure: true
}))

router.patch('/', createRoute({
  method: m.edit,
  validator: v.getEditErr,
  ok: 202,
  secure: true
}))

router.post('/delete', createRoute({
  method: m.deleteItem,
  validator: v.getDeleteErr,
  ok: 202,
  secure: true
}))

export default router

import Router from 'koa-router'
import { createRoute } from '../../helpers/server'
import * as m from '../../db/api/options'
import * as v from '../../helpers/validators/options'

const router = new Router({ prefix: '/options' })

router.get('/:scope', createRoute({
  method: m.get,
  validator: v.getGetErr,
  useParams: true
}))

router.patch('/:scope', createRoute({
  method: m.update,
  validator: v.getUpdateErr,
  useParams: true,
  secure: true
}))

export default router

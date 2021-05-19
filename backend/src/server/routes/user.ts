import Router from 'koa-router'
import { createRoute } from '../../helpers/server'
import * as m from '../../db/api/user'

const router = new Router({ prefix: '/user' })

router.get('/', createRoute({
  method: m.getUser,
  secure: true
}))

export default router

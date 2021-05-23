import Router from 'koa-router'
import { createRoute } from '../../helpers/server'
import * as m from '../../db/api/user'
import * as v from '../../helpers/validators/user'

const router = new Router({ prefix: '/user' })

router.get('/', createRoute({
  method: m.getUser,
  secure: true
}))

router.delete('/:username', createRoute({
  method: m.deleteUser,
  validator: v.getDeleteErr,
  useParams: true,
  secure: true
}))

/*
router.get('/all', createRoute({
  method: m.getAll,
  secure: true
}))
*/

export default router

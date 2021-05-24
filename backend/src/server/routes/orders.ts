import Router from 'koa-router'
import { createRoute } from '../../helpers/server'
import * as m from '../../db/api/orders'
import * as v from '../../helpers/validators/orders'

const prefix = 'order'
export const order = new Router({ prefix: `/${prefix}` })
export const orders = new Router({ prefix: `/${prefix}s` })

order.get('/:id', createRoute({
  method: m.get,
  validator: v.getGetErr,
  useParams: true
}))

order.patch('/:id', createRoute({
  method: m.update,
  validator: v.getUpdateErr,
  ok: 202,
  useParams: true,
  secure: true
}))

/*
order.delete('/:id', createRoute({
  method: m.deleteItem,
  validator: v.getDeleteErr,
  useParams: true,
  secure: true
}))
*/

orders.get('/', createRoute({
  method: m.getAll,
  secure: true
}))

orders.post('/create', createRoute({
  method: m.create,
  validator: v.getCreateErr,
  ok: 201
}))

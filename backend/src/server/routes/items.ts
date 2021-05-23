import Router from 'koa-router'
import { createRoute } from '../../helpers/server'
import * as m from '../../db/api/items'
import * as v from '../../helpers/validators/items'

const prefix = 'item'
export const item = new Router({ prefix: `/${prefix}` })
export const items = new Router({ prefix: `/${prefix}s` })

item.get('/:id', createRoute({
  method: m.get,
  validator: v.getGetErr,
  useParams: true
}))

item.patch('/:id', createRoute({
  method: m.update,
  validator: v.getUpdateErr,
  ok: 202,
  useParams: true,
  secure: true
}))

item.delete('/:id', createRoute({
  method: m.deleteItem,
  validator: v.getDeleteErr,
  useParams: true,
  secure: true
}))

items.get('/', createRoute({
  method: m.getAll,
  secure: true
}))

items.post('/add', createRoute({
  method: m.add,
  validator: v.getAddErr,
  ok: 201,
  secure: true
}))

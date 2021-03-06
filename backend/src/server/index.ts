import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import cors from '@koa/cors'
import logger from 'koa-logger'

import { getFromEnv } from '../../../helpers/env'

import options from './routes/options'
import auth from './routes/auth'
import user from './routes/user'
import admin from './routes/admin'
import { item, items } from './routes/items'
import { order, orders } from './routes/orders'

const isDev = process.env.NODE_ENV === 'development'

const app = new Koa()

// middlewares
if (isDev) app.use(logger())
app.use(cors())
app.use(bodyParser({
  onerror (err, ctx) { ctx.throw(400, err.message) }
}))

// routes
app.use(options.routes())
app.use(auth.routes())
app.use(user.routes())
app.use(admin.routes())
app.use(item.routes())
app.use(items.routes())
app.use(order.routes())
app.use(orders.routes())

// listen
let host: string
let port: number

if (isDev) {
  host = getFromEnv('BACKEND_DEV_HOST', 'localhost')
  port = Number(getFromEnv('BACKEND_DEV_PORT', '3000'))
} else {
  host = getFromEnv('BACKEND_PROD_HOST')
  port = Number(getFromEnv('BACKEND_PROD_PORT'))
}

app.listen(port, host, () => {
  console.log(`Listening on ${host}:${port}`)
})

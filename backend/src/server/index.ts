import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import { getFromEnv } from '../helpers/env'

const isDev = process.env.NODE_ENV === 'development'

const app = new Koa()

// middlewares
app.use(bodyParser({
  onerror (err, ctx) { ctx.throw(400, err.message) }
}))

const port = Number(isDev
  ? getFromEnv('BACKEND_DEV_PORT', '3000')
  : getFromEnv('BACKEND_PROD_PORT'))

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import { getFromEnv } from '../helpers/env'

const app = new Koa()

// middlewares
app.use(bodyParser({
  onerror (err, ctx) { ctx.throw(400, err.message) }
}))

const port = getFromEnv('PORT')
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

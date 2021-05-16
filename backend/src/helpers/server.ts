import type { Context } from 'koa'

export class InternalError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'InternalError'
  }
}

type Request = Context['request']
export type Data =
  Request['body'] & Request['query'] & Context['params']
type Validator = (data: Data) => string | Promise<string>

type Method = (...args: any[]) => Promise<any>
interface CreateRouteOpts {
  method: Method
  validator?: Validator
  ok?: number
  useQuery?: boolean
  useParams?: boolean
}

export function createRoute ({
  method, validator = () => '', ok = 200,
  useQuery = false, useParams = false
}: CreateRouteOpts) {
  return async (ctx: Context) => {
    const { request } = ctx
    const data: Data = {
      ...request.body,
      ...(useQuery && request.query),
      ...(useParams && ctx.params)
    }
    const payload = [data]

    let dataErr: string
    try {
      dataErr = await validator(data)
    } catch (err) { ctx.throw(500, err) }
    ctx.assert(dataErr === '', 400, dataErr)

    try {
      ctx.body = await method(...payload)
      ctx.status = ok
    } catch (err) {
      if (err instanceof InternalError) ctx.throw(500, err)
      else ctx.throw(400, err)
    }
  }
}

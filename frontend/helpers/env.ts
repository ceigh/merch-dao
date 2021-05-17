import { getFromEnv } from '../../helpers/env'

export function parseEnv (): Record<string, any> {
  const isDev = process.env.NODE_ENV === 'development'

  let host: string
  let port: number
  let apiEndpoint: string

  if (isDev) {
    host = getFromEnv('FRONTEND_DEV_HOST', '127.0.0.1')
    port = Number(getFromEnv('FRONTEND_DEV_PORT', '4000'))

    const backendHost = getFromEnv('BACKEND_DEV_HOST', 'localhost')
    const backendPort = getFromEnv('BACKEND_DEV_PORT', '3000')
    apiEndpoint = `http://${backendHost}:${backendPort}`
  } else {
    host = getFromEnv('FRONTEND_PROD_HOST')
    port = Number(getFromEnv('FRONTEND_PROD_PORT'))

    const backendHost = getFromEnv('BACKEND_PROD_HOST')
    const backendPort = getFromEnv('BACKEND_PROD_PORT')
    apiEndpoint = `https://${backendHost}:${backendPort}`
  }

  return { isDev, host, port, apiEndpoint }
}

import { Client, query } from 'faunadb'
import { getFromEnv } from '../../../helpers/env'

export function createClient (key?: string): Client {
  return new Client({
    secret: key ?? getFromEnv('FN_KEY'),
    timeout: 30,
    queryTimeout: 10000
  })
}

export const q = query

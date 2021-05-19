import { createClient, q } from '../..'
import { add as addAdmin } from '../../api/admin'
import type { values } from 'faunadb/src/types/values'

type Ref = values.Ref
export type Collections = Record<string, Ref>

const { CreateCollection } = q

export const usersCollection = 'users'
export const itemsCollection = 'items'
export const ordersCollection = 'orders'

export default async function (key: string): Promise<Collections> {
  const client = createClient(key)
  const collections = [
    { name: usersCollection },
    { name: itemsCollection },
    { name: ordersCollection }
  ]

  const entries = await Promise.all(collections.map(async c => {
    const { ref }: { ref: Ref } =
      await client.query(CreateCollection(c))
    return [c.name, ref]
  }))

  // add default admin
  await addAdmin({ username: 'admin', password: 'admin' }, key)

  return Object.fromEntries(entries)
}

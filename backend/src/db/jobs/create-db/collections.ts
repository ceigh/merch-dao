import { createClient, q } from '../..'
import { create as createAdmin } from '../../api/admin'
import { create as createOptions } from '../../api/options'
import type { values } from 'faunadb/src/types/values'

type Ref = values.Ref
export type Collections = Record<string, Ref>

const { CreateCollection } = q

export const optionsCollection = 'options'
export const usersCollection = 'users'
export const itemsCollection = 'items'
export const ordersCollection = 'orders'

export default async function (key: string): Promise<Collections> {
  const client = createClient(key)
  const collections = [
    { name: optionsCollection },
    { name: usersCollection },
    { name: itemsCollection },
    { name: ordersCollection }
  ]

  const entries = await Promise.all(collections.map(async c => {
    const { ref }: { ref: Ref } =
      await client.query(CreateCollection(c))
    return [c.name, ref]
  }))

  await createOptions({ scope: 'default', currentItem: '' }, key)
  await createAdmin({ username: 'admin', password: 'admin' }, key)

  return Object.fromEntries(entries)
}

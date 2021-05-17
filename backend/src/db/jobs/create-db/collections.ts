import { createClient, q } from '../..'
import type { values } from 'faunadb/src/types/values'
import type { Admin } from '../../../../../types'

type Ref = values.Ref
export type Collections = Record<string, Ref>

const { CreateCollection, Create, Collection } = q

const adminsCollection = 'admins'

export default async function (key: string): Promise<Collections> {
  const client = createClient(key)
  const collections = [
    { name: adminsCollection },
    { name: 'items' },
    { name: 'orders' }
  ]

  const entries = await Promise.all(collections.map(async c => {
    const { ref }: { ref: Ref } =
      await client.query(CreateCollection(c))
    return [c.name, ref]
  }))

  // add predefined data
  const admin: Admin = { username: 'admin' }

  await client.query(
    Create(Collection(adminsCollection),
      { credentials: { password: 'admin' }, data: admin }))

  return Object.fromEntries(entries)
}
